import { useEffect, useState } from 'react';
import { api } from '../../lib/api.js';

export default function AdminDashboard() {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    api.adminStats().then(setStats);
  }, []);

  if (!stats) return <p>Loading…</p>;

  const cards = [
    { label: 'Total cars', value: stats.totalCars },
    { label: 'Total bookings', value: stats.totalBookings },
    { label: 'Revenue', value: `$${stats.revenue}` },
    { label: "Today's pickups", value: stats.todayPickups },
    { label: "Today's returns", value: stats.todayReturns },
  ];

  return (
    <div>
      <h1 className="font-display text-2xl mb-6">Dashboard</h1>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-surface rounded-2xl p-4 border border-black/10">
            <p className="text-xs text-muted">{c.label}</p>
            <p className="font-display text-2xl text-gold mt-1">{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
