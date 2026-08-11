import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { api } from '../lib/api.js';

export default function CarDetail() {
  const { id } = useParams();
  const [car, setCar] = useState(null);

  useEffect(() => {
    api.getCar(id).then(({ car }) => setCar(car));
  }, [id]);

  if (!car) return <div className="max-w-4xl mx-auto px-4 py-10">Loading…</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-10 grid md:grid-cols-2 gap-8">
      <div className="aspect-[4/3] rounded-2xl bg-gold/10 overflow-hidden">
        {car.image_url ? (
          <img src={car.image_url} alt={car.name} className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold/70 font-display text-lg">
            {car.make}
          </div>
        )}
      </div>
      <div>
        <h1 className="font-display text-3xl mb-2">{car.name}</h1>
        <p className="text-muted mb-4">
          {car.year} · {car.seats} seats · {car.transmission}
        </p>
        <p className="mb-6">{car.description}</p>
        <p className="font-mono text-2xl text-gold font-semibold mb-6">
          ${car.price_per_day}
          <span className="text-muted text-sm font-body">/day</span>
        </p>
        <Link
          to={`/booking/${car.id}`}
          className="inline-block bg-coral text-white px-6 py-3 rounded-full font-semibold hover:bg-coral-dark transition"
        >
          Book this car
        </Link>
      </div>
    </div>
  );
}
