-- Shalom Tours and Travels car rental schema built on 11-Aug

CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE,
  password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'customer',
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS cars (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  name TEXT NOT NULL,
  make TEXT NOT NULL,
  model TEXT NOT NULL,
  year INTEGER NOT NULL,
  category TEXT NOT NULL,
  seats INTEGER NOT NULL,
  transmission TEXT NOT NULL,
  price_per_day REAL NOT NULL,
  image_url TEXT,
  status TEXT NOT NULL DEFAULT 'available',
  description TEXT,
  created_at TEXT NOT NULL DEFAULT (datetime('now'))
);

CREATE TABLE IF NOT EXISTS bookings (
  id INTEGER PRIMARY KEY AUTOINCREMENT,
  user_id INTEGER NOT NULL,
  car_id INTEGER NOT NULL,
  start_date TEXT NOT NULL,
  end_date TEXT NOT NULL,
  pickup_location TEXT,
  total_price REAL NOT NULL,
  status TEXT NOT NULL DEFAULT 'confirmed',
  created_at TEXT NOT NULL DEFAULT (datetime('now')),
  FOREIGN KEY (user_id) REFERENCES users(id),
  FOREIGN KEY (car_id) REFERENCES cars(id)
);

CREATE INDEX IF NOT EXISTS idx_bookings_user ON bookings(user_id);
CREATE INDEX IF NOT EXISTS idx_bookings_car ON bookings(car_id);
CREATE INDEX IF NOT EXISTS idx_cars_status ON cars(status);

-- Seed fleet so the site isn't empty on first load
INSERT INTO cars (name, make, model, year, category, seats, transmission, price_per_day, description) VALUES
  ('Sunny Hatchback', 'Toyota', 'Yaris', 2022, 'economy', 5, 'automatic', 35, 'Light, easy to park, and easy on gas — a good everyday city car.'),
  ('City Runner', 'Honda', 'Civic', 2023, 'economy', 5, 'manual', 38, 'Reliable and fun to drive, with room for a full carload of friends.'),
  ('Trailblazer', 'Jeep', 'Compass', 2022, 'suv', 5, 'automatic', 68, 'Compact SUV with enough clearance for gravel roads and weekend trips.'),
  ('Highlander Plus', 'Toyota', 'Highlander', 2023, 'suv', 7, 'automatic', 89, 'Three rows of seats, plenty of trunk space, built for family road trips.'),
  ('Velvet Line', 'Mercedes-Benz', 'C-Class', 2023, 'luxury', 4, 'automatic', 145, 'A quiet, comfortable ride for the trip that deserves a little extra.'),
  ('Skyline Cruiser', 'BMW', '5 Series', 2022, 'luxury', 5, 'automatic', 160, 'Confident handling and a cabin that feels like a treat every time.'),
  ('Family Hauler', 'Chrysler', 'Pacifica', 2021, 'van', 7, 'automatic', 95, 'Sliding doors, foldable seats, and cupholders for everyone.'),
  ('CargoMate', 'Ford', 'Transit', 2022, 'van', 12, 'manual', 110, 'Big on space — good for group trips or hauling gear.');
