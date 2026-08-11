import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const TABS = [
  { id: 'outstation', label: 'Outstation' },
  { id: 'local', label: 'Local' },
  { id: 'airport', label: 'Airport' },
];

export default function SearchBar() {
  const [tab, setTab] = useState('outstation');
  const [tripMode, setTripMode] = useState('roundtrip');
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [pickupDate, setPickupDate] = useState('');
  const [returnDate, setReturnDate] = useState('');
  const [pickupTime, setPickupTime] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('tripType', tab);
    if (tab === 'outstation') params.set('tripMode', tripMode);
    if (from) params.set('from', from);
    if (to) params.set('to', to);
    if (pickupDate) params.set('start', pickupDate);
    if (tab === 'outstation' && tripMode === 'roundtrip' && returnDate) params.set('end', returnDate);
    if (pickupTime) params.set('time', pickupTime);
    navigate(`/cars?${params.toString()}`);
  }

  return (
    <div className="max-w-2xl w-full rounded-2xl shadow-xl shadow-black/10 overflow-hidden">
      <div className="flex">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`flex-1 py-3 text-sm font-semibold transition ${
              tab === t.id ? 'bg-teal text-white' : 'bg-teal-light text-teal-dark hover:bg-teal-light/70'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <form onSubmit={handleSubmit} className="bg-surface p-5 space-y-4 text-left">
        {tab === 'outstation' && (
          <div className="flex gap-6 text-sm font-medium">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripMode"
                checked={tripMode === 'oneway'}
                onChange={() => setTripMode('oneway')}
                className="accent-coral"
              />
              One Way
            </label>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="tripMode"
                checked={tripMode === 'roundtrip'}
                onChange={() => setTripMode('roundtrip')}
                className="accent-coral"
              />
              Round Trip
            </label>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-muted mb-1">From</label>
          <input
            value={from}
            onChange={(e) => setFrom(e.target.value)}
            placeholder="Pickup city or area"
            className="w-full px-4 py-2.5 rounded-lg border border-black/10"
          />
        </div>

        {tab !== 'local' && (
          <div>
            <label className="block text-xs font-semibold text-muted mb-1">To</label>
            <input
              value={to}
              onChange={(e) => setTo(e.target.value)}
              placeholder="Destination"
              className="w-full px-4 py-2.5 rounded-lg border border-black/10"
            />
          </div>
        )}

        <div className={`grid ${tab === 'outstation' && tripMode === 'roundtrip' ? 'grid-cols-3' : 'grid-cols-2'} gap-3`}>
          <div>
            <label className="block text-xs font-semibold text-muted mb-1">Pick-Up Date</label>
            <input
              type="date"
              value={pickupDate}
              onChange={(e) => setPickupDate(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-black/10"
            />
          </div>
          {tab === 'outstation' && tripMode === 'roundtrip' && (
            <div>
              <label className="block text-xs font-semibold text-muted mb-1">Return</label>
              <input
                type="date"
                value={returnDate}
                onChange={(e) => setReturnDate(e.target.value)}
                className="w-full px-3 py-2.5 rounded-lg border border-black/10"
              />
            </div>
          )}
          <div>
            <label className="block text-xs font-semibold text-muted mb-1">Pick-Up Time</label>
            <input
              type="time"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg border border-black/10"
            />
          </div>
        </div>

        <button className="w-full bg-coral text-white py-3 rounded-xl font-semibold text-lg hover:bg-coral-dark transition">
          Search Car
        </button>
      </form>
    </div>
  );
}
