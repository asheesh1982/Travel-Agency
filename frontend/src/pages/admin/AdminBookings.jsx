import { useEffect, useState } from 'react';
import { api } from '../../lib/api.js';

export default function AdminBookings() {
  const [bookings, setBookings] = useState([]);

  function load() {
    api.adminBookings().then(({ bookings }) => setBookings(bookings));
  }
  useEffect(load, []);

  async function setStatus(id, status) {
    await api.adminUpdateBooking(id, { status });
    load();
  }

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Bookings</h1>
      <div className="space-y-3">
        {bookings.map((b) => (
          <div key={b.id} className="bg-surface rounded-2xl p-4 border border-white/10 flex items-center justify-between">
            <div>
              <p className="font-display">{b.car_name}</p>
              <p className="text-sm text-muted">
                {b.customer_name} ({b.customer_email})
              </p>
              <p className="text-sm text-muted">
                {b.start_date} → {b.end_date}
              </p>
            </div>
            <div className="text-right">
              <p className="font-mono text-gold font-semibold mb-2">${b.total_price}</p>
              <select
                value={b.status}
                onChange={(e) => setStatus(b.id, e.target.value)}
                className="px-3 py-1 rounded-full border border-white/10 text-sm capitalize"
              >
                <option value="confirmed">Confirmed</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
