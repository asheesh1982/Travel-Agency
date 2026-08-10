import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { api } from '../lib/api.js';
import CarCard from '../components/CarCard.jsx';

export default function Cars() {
  const [searchParams] = useSearchParams();
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    category: searchParams.get('category') || '',
    transmission: searchParams.get('transmission') || '',
    maxPrice: searchParams.get('maxPrice') || '',
  });

  useEffect(() => {
    setLoading(true);
    const params = {};
    if (filters.category) params.category = filters.category;
    if (filters.transmission) params.transmission = filters.transmission;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    api
      .getCars(params)
      .then(({ cars }) => setCars(cars))
      .finally(() => setLoading(false));
  }, [filters]);

  function updateFilter(key, value) {
    setFilters((f) => ({ ...f, [key]: value }));
  }

  return (
    <div className="max-w-6xl mx-auto px-4 py-10">
      <h1 className="font-display text-3xl mb-6">Browse cars</h1>
      <div className="flex flex-wrap gap-3 mb-8">
        <select
          value={filters.category}
          onChange={(e) => updateFilter('category', e.target.value)}
          className="px-4 py-2 rounded-full border border-white/10 bg-surface"
        >
          <option value="">All categories</option>
          <option value="economy">Economy</option>
          <option value="suv">SUV</option>
          <option value="luxury">Luxury</option>
          <option value="van">Van</option>
        </select>
        <select
          value={filters.transmission}
          onChange={(e) => updateFilter('transmission', e.target.value)}
          className="px-4 py-2 rounded-full border border-white/10 bg-surface"
        >
          <option value="">Any transmission</option>
          <option value="automatic">Automatic</option>
          <option value="manual">Manual</option>
        </select>
        <select
          value={filters.maxPrice}
          onChange={(e) => updateFilter('maxPrice', e.target.value)}
          className="px-4 py-2 rounded-full border border-white/10 bg-surface"
        >
          <option value="">Any price</option>
          <option value="50">Under $50/day</option>
          <option value="100">Under $100/day</option>
          <option value="200">Under $200/day</option>
        </select>
      </div>

      {loading ? (
        <p className="text-muted">Loading cars…</p>
      ) : cars.length === 0 ? (
        <p className="text-muted">No cars match those filters yet. Try widening your search.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {cars.map((car) => (
            <CarCard key={car.id} car={car} />
          ))}
        </div>
      )}
    </div>
  );
}
