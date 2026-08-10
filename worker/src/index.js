import { Hono } from 'hono';
import { cors } from 'hono/cors';
import { hashPassword, verifyPassword, signJWT, verifyJWT } from './auth.js';

const app = new Hono();

app.use('*', cors({
  origin: (origin) => origin || '*',
  credentials: true,
}));

async function getAuthUser(c) {
  const header = c.req.header('Authorization') || '';
  const token = header.replace('Bearer ', '');
  if (!token) return null;
  return verifyJWT(token, c.env.JWT_SECRET);
}

async function requireAdmin(c) {
  const payload = await getAuthUser(c);
  if (!payload || payload.role !== 'admin') return null;
  return payload;
}

// ---------- Auth ----------

app.post('/api/auth/signup', async (c) => {
  const { name, email, password, adminCode } = await c.req.json();
  if (!name || !email || !password) return c.json({ error: 'Missing fields' }, 400);

  const existing = await c.env.DB.prepare('SELECT id FROM users WHERE email = ?').bind(email).first();
  if (existing) return c.json({ error: 'Email already registered' }, 409);

  const role = adminCode && c.env.ADMIN_SIGNUP_CODE && adminCode === c.env.ADMIN_SIGNUP_CODE ? 'admin' : 'customer';
  const password_hash = await hashPassword(password);

  const result = await c.env.DB.prepare(
    'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)'
  ).bind(name, email, password_hash, role).run();

  const userId = result.meta.last_row_id;
  const token = await signJWT({ sub: userId, role }, c.env.JWT_SECRET);
  return c.json({ token, user: { id: userId, name, email, role } });
});

app.post('/api/auth/login', async (c) => {
  const { email, password } = await c.req.json();
  const user = await c.env.DB.prepare('SELECT * FROM users WHERE email = ?').bind(email).first();
  if (!user) return c.json({ error: 'Invalid credentials' }, 401);

  const valid = await verifyPassword(password, user.password_hash);
  if (!valid) return c.json({ error: 'Invalid credentials' }, 401);

  const token = await signJWT({ sub: user.id, role: user.role }, c.env.JWT_SECRET);
  return c.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
});

app.get('/api/auth/me', async (c) => {
  const payload = await getAuthUser(c);
  if (!payload) return c.json({ error: 'Unauthorized' }, 401);
  const user = await c.env.DB.prepare('SELECT id, name, email, role FROM users WHERE id = ?').bind(payload.sub).first();
  if (!user) return c.json({ error: 'Unauthorized' }, 401);
  return c.json({ user });
});

// ---------- Cars (public) ----------

app.get('/api/cars', async (c) => {
  const { category, transmission, minPrice, maxPrice, seats } = c.req.query();
  let query = "SELECT * FROM cars WHERE status = 'available'";
  const params = [];
  if (category) { query += ' AND category = ?'; params.push(category); }
  if (transmission) { query += ' AND transmission = ?'; params.push(transmission); }
  if (seats) { query += ' AND seats >= ?'; params.push(Number(seats)); }
  if (minPrice) { query += ' AND price_per_day >= ?'; params.push(Number(minPrice)); }
  if (maxPrice) { query += ' AND price_per_day <= ?'; params.push(Number(maxPrice)); }
  query += ' ORDER BY price_per_day ASC';

  const { results } = await c.env.DB.prepare(query).bind(...params).all();
  return c.json({ cars: results });
});

app.get('/api/cars/:id', async (c) => {
  const car = await c.env.DB.prepare('SELECT * FROM cars WHERE id = ?').bind(c.req.param('id')).first();
  if (!car) return c.json({ error: 'Not found' }, 404);
  return c.json({ car });
});

// ---------- Cars (admin) ----------

app.post('/api/admin/cars', async (c) => {
  if (!(await requireAdmin(c))) return c.json({ error: 'Forbidden' }, 403);
  const b = await c.req.json();
  const result = await c.env.DB.prepare(
    `INSERT INTO cars (name, make, model, year, category, seats, transmission, price_per_day, image_url, description)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).bind(b.name, b.make, b.model, b.year, b.category, b.seats, b.transmission, b.price_per_day, b.image_url || null, b.description || null).run();
  return c.json({ id: result.meta.last_row_id });
});

app.put('/api/admin/cars/:id', async (c) => {
  if (!(await requireAdmin(c))) return c.json({ error: 'Forbidden' }, 403);
  const id = c.req.param('id');
  const body = await c.req.json();
  const fields = ['name', 'make', 'model', 'year', 'category', 'seats', 'transmission', 'price_per_day', 'image_url', 'status', 'description'];
  const sets = [];
  const params = [];
  for (const f of fields) {
    if (body[f] !== undefined) { sets.push(`${f} = ?`); params.push(body[f]); }
  }
  if (!sets.length) return c.json({ error: 'No fields to update' }, 400);
  params.push(id);
  await c.env.DB.prepare(`UPDATE cars SET ${sets.join(', ')} WHERE id = ?`).bind(...params).run();
  return c.json({ ok: true });
});

app.delete('/api/admin/cars/:id', async (c) => {
  if (!(await requireAdmin(c))) return c.json({ error: 'Forbidden' }, 403);
  await c.env.DB.prepare('DELETE FROM cars WHERE id = ?').bind(c.req.param('id')).run();
  return c.json({ ok: true });
});

// ---------- Bookings ----------

app.post('/api/bookings', async (c) => {
  const payload = await getAuthUser(c);
  if (!payload) return c.json({ error: 'Unauthorized' }, 401);

  const { car_id, start_date, end_date, pickup_location } = await c.req.json();
  if (!car_id || !start_date || !end_date) return c.json({ error: 'Missing fields' }, 400);

  const car = await c.env.DB.prepare('SELECT * FROM cars WHERE id = ?').bind(car_id).first();
  if (!car) return c.json({ error: 'Car not found' }, 404);

  const days = Math.max(1, Math.ceil((new Date(end_date) - new Date(start_date)) / 86400000));
  const total_price = days * car.price_per_day;

  const result = await c.env.DB.prepare(
    `INSERT INTO bookings (user_id, car_id, start_date, end_date, pickup_location, total_price)
     VALUES (?, ?, ?, ?, ?, ?)`
  ).bind(payload.sub, car_id, start_date, end_date, pickup_location || null, total_price).run();

  return c.json({ id: result.meta.last_row_id, total_price, days });
});

app.get('/api/bookings/mine', async (c) => {
  const payload = await getAuthUser(c);
  if (!payload) return c.json({ error: 'Unauthorized' }, 401);
  const { results } = await c.env.DB.prepare(
    `SELECT b.*, cars.name AS car_name, cars.image_url FROM bookings b
     JOIN cars ON b.car_id = cars.id
     WHERE b.user_id = ? ORDER BY b.created_at DESC`
  ).bind(payload.sub).all();
  return c.json({ bookings: results });
});

app.put('/api/bookings/:id/cancel', async (c) => {
  const payload = await getAuthUser(c);
  if (!payload) return c.json({ error: 'Unauthorized' }, 401);
  const booking = await c.env.DB.prepare('SELECT * FROM bookings WHERE id = ?').bind(c.req.param('id')).first();
  if (!booking || booking.user_id !== payload.sub) return c.json({ error: 'Not found' }, 404);
  await c.env.DB.prepare("UPDATE bookings SET status = 'cancelled' WHERE id = ?").bind(booking.id).run();
  return c.json({ ok: true });
});

// ---------- Bookings (admin) ----------

app.get('/api/admin/bookings', async (c) => {
  if (!(await requireAdmin(c))) return c.json({ error: 'Forbidden' }, 403);
  const { results } = await c.env.DB.prepare(
    `SELECT b.*, cars.name AS car_name, users.name AS customer_name, users.email AS customer_email
     FROM bookings b
     JOIN cars ON b.car_id = cars.id
     JOIN users ON b.user_id = users.id
     ORDER BY b.created_at DESC`
  ).all();
  return c.json({ bookings: results });
});

app.put('/api/admin/bookings/:id', async (c) => {
  if (!(await requireAdmin(c))) return c.json({ error: 'Forbidden' }, 403);
  const { status } = await c.req.json();
  await c.env.DB.prepare('UPDATE bookings SET status = ? WHERE id = ?').bind(status, c.req.param('id')).run();
  return c.json({ ok: true });
});

app.get('/api/admin/stats', async (c) => {
  if (!(await requireAdmin(c))) return c.json({ error: 'Forbidden' }, 403);
  const totalCars = await c.env.DB.prepare('SELECT COUNT(*) AS n FROM cars').first();
  const totalBookings = await c.env.DB.prepare('SELECT COUNT(*) AS n FROM bookings').first();
  const revenue = await c.env.DB.prepare("SELECT SUM(total_price) AS sum FROM bookings WHERE status != 'cancelled'").first();
  const todayPickups = await c.env.DB.prepare("SELECT COUNT(*) AS n FROM bookings WHERE start_date = date('now') AND status = 'confirmed'").first();
  const todayReturns = await c.env.DB.prepare("SELECT COUNT(*) AS n FROM bookings WHERE end_date = date('now') AND status = 'confirmed'").first();
  return c.json({
    totalCars: totalCars.n,
    totalBookings: totalBookings.n,
    revenue: revenue.sum || 0,
    todayPickups: todayPickups.n,
    todayReturns: todayReturns.n,
  });
});

app.get('/', (c) => c.json({ ok: true, service: 'car-rental-api' }));

export default app;
