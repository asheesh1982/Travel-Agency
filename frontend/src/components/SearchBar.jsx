import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function SearchBar() {
  const [location, setLocation] = useState('');
  const [start, setStart] = useState('');
  const [end, setEnd] = useState('');
  const navigate = useNavigate();

  function handleSubmit(e) {
    e.preventDefault();
    const params = new URLSearchParams();
    if (location) params.set('location', location);
    if (start) params.set('start', start);
    if (end) params.set('end', end);
    navigate(`/cars?${params.toString()}`);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-surface border border-gold/25 rounded-2xl shadow-xl shadow-black/10 p-3 flex flex-col md:flex-row gap-2 max-w-3xl w-full"
    >
      <input
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        placeholder="Pickup city"
        className="flex-1 px-4 py-3 rounded-xl outline-none border border-black/10"
      />
      <input
        type="date"
        value={start}
        onChange={(e) => setStart(e.target.value)}
        className="px-4 py-3 rounded-xl outline-none border border-black/10"
      />
      <input
        type="date"
        value={end}
        onChange={(e) => setEnd(e.target.value)}
        className="px-4 py-3 rounded-xl outline-none border border-black/10"
      />
      <button className="bg-coral text-white px-6 py-3 rounded-xl font-semibold hover:bg-coral-dark transition">
        Search
      </button>
    </form>
  );
}
