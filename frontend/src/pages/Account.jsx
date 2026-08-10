import { useEffect, useState } from 'react';
import { api } from '../lib/api.js';

export default function Account() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  function load() {
    api
      .myBookings()
      .then(({ bookings }) => setBookings(bookings))
      .finally(() => setLoading(false));
  }

  useEffect(load, []);

  async function cancel(id) {
    await api.cancelBooking(id);
    load();
  }

  return (
    <div className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="font-display text-2xl mb-6">My bookings</h1>
      {loading ? (
        <p>Loading…</p>
      ) : bookings.length === 0 ? (
        <p className="text-muted">No bookings yet — go find your next ride.</p>
      ) : (
        <div className="space-y-4">
          {bookings.map((b) => (
            <div key={b.id} className="bg-surface rounded-2xl p-4 border border-white/10 flex items-center justify-between">
              <div>
                <p className="font-display">{b.car_name}</p>
                <p className="text-sm text-muted">
                  {b.start_date} → {b.end_date} · {b.pickup_location || 'No location set'}
                </p>
                <p className="text-xs mt-1 inline-block px-2 py-0.5 rounded-full bg-gold/15 border border-gold/30 capitalize">{b.status}</p>
              </div>
              <div className="text-right">
                <p className="font-mono text-gold font-semibold">${b.total_price}</p>
                {b.status === 'confirmed' && (
                  <button onClick={() => cancel(b.id)} className="text-sm text-red-400 mt-2">
                    Cancel
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
