const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8787';

function getToken() {
  return localStorage.getItem('token');
}

async function request(path, { method = 'GET', body, auth = false } = {}) {
  const headers = { 'Content-Type': 'application/json' };
  if (auth) {
    const token = getToken();
    if (token) headers.Authorization = `Bearer ${token}`;
  }
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.error || 'Something went wrong');
  return data;
}

export const api = {
  signup: (payload) => request('/api/auth/signup', { method: 'POST', body: payload }),
  login: (payload) => request('/api/auth/login', { method: 'POST', body: payload }),
  me: () => request('/api/auth/me', { auth: true }),

  getCars: (params = {}) => {
    const qs = new URLSearchParams(params).toString();
    return request(`/api/cars${qs ? `?${qs}` : ''}`);
  },
  getCar: (id) => request(`/api/cars/${id}`),

  createBooking: (payload) => request('/api/bookings', { method: 'POST', body: payload, auth: true }),
  myBookings: () => request('/api/bookings/mine', { auth: true }),
  cancelBooking: (id) => request(`/api/bookings/${id}/cancel`, { method: 'PUT', auth: true }),

  adminCreateCar: (payload) => request('/api/admin/cars', { method: 'POST', body: payload, auth: true }),
  adminUpdateCar: (id, payload) => request(`/api/admin/cars/${id}`, { method: 'PUT', body: payload, auth: true }),
  adminDeleteCar: (id) => request(`/api/admin/cars/${id}`, { method: 'DELETE', auth: true }),
  adminBookings: () => request('/api/admin/bookings', { auth: true }),
  adminUpdateBooking: (id, payload) => request(`/api/admin/bookings/${id}`, { method: 'PUT', body: payload, auth: true }),
  adminStats: () => request('/api/admin/stats', { auth: true }),
};
