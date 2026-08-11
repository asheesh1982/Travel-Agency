import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { api } from '../lib/api.js';
import { useAuth } from '../context/AuthContext.jsx';

export default function Booking() {
  const { carId } = useParams();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [car, setCar] = useState(null);
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const [pickup, setPickup] = useState('');
  const [error, setError] = useState('');
  const [confirmed, setConfirmed] = useState(null);

  useEffect(() => {
    api.getCar(carId).then(({ car }) => setCar(car));
  }, [carId]);

  const days = start && end ? Math.max(1, Math.ceil((new Date(end) - new Date(start)) / 86400000)) : 0;
  const total = car ? days * car.price_per_day : 0;

  async function handleSubmit(e) {
    e.preventDefault();
    setError('');
    if (!user) {
      navigate('/login');
      return;
    }
    if (!start || !end) {
      setError('Pick your dates first.');
      return;
    }
    try {
      const result = await api.createBooking({
        car_id: Number(carId),
        start_date: start,
        end_date: end,
        pickup_location: pickup,
      });
      setConfirmed(result);
    } catch (err) {
      setError(err.message);
    }
  }

  if (confirmed) {
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <h1 className="font-display text-3xl mb-4">You&apos;re booked!</h1>
        <p className="text-ink/80 mb-6">
          Total charged (mock payment): <span className="font-mono text-gold">${confirmed.total_price}</span>
        </p>
        <Link to="/account" className="text-gold font-semibold">
          View my bookings →
        </Link>
      </div>
    );
  }

  if (!car) return <div className="max-w-lg mx-auto px-4 py-10">Loading…</div>;

  return (
    <div className="max-w-lg mx-auto px-4 py-10">
      <h1 className="font-display text-2xl mb-6">Book the {car.name}</h1>
      <form onSubmit={handleSubmit} className="bg-surface rounded-2xl p-6 border border-black/10 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Pickup date</label>
          <input
            type="date"
            value={start}
            onChange={(e) => setStart(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-black/10"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Return date</label>
          <input
            type="date"
            value={end}
            onChange={(e) => setEnd(e.target.value)}
            className="w-full px-4 py-2 rounded-xl border border-black/10"
            required
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Pickup location</label>
          <input
            value={pickup}
            onChange={(e) => setPickup(e.target.value)}
            placeholder="e.g. Downtown branch"
            className="w-full px-4 py-2 rounded-xl border border-black/10"
          />
        </div>
        {days > 0 && (
          <p className="text-sm text-muted">
            {days} day{days > 1 ? 's' : ''} × ${car.price_per_day} ={' '}
            <span className="font-mono text-gold font-semibold">${total}</span>
          </p>
        )}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        <button className="w-full bg-coral text-white py-3 rounded-xl font-semibold hover:bg-coral-dark transition">
          Confirm booking (mock payment)
        </button>
      </form>
    </div>
  );
}
