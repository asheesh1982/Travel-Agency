import { Link } from 'react-router-dom';

export default function CarCard({ car }) {
  return (
    <Link
      to={`/cars/${car.id}`}
      className="group block bg-surface rounded-2xl overflow-hidden border border-white/10 hover:border-gold/40 hover:shadow-lg hover:shadow-gold/5 transition"
    >
      <div className="aspect-[4/3] bg-black/30 overflow-hidden">
        {car.image_url ? (
          <img
            src={car.image_url}
            alt={car.name}
            className="w-full h-full object-cover group-hover:scale-105 transition duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-gold/70 font-display text-lg">
            {car.make}
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="font-display text-lg text-cream">{car.name}</h3>
          <span className="text-xs uppercase tracking-wide bg-gold/15 text-gold border border-gold/30 px-2 py-1 rounded-full whitespace-nowrap">
            {car.category}
          </span>
        </div>
        <p className="text-sm text-muted mt-1">
          {car.seats} seats · {car.transmission}
        </p>
        <p className="mt-3 font-mono text-gold font-semibold">
          ${car.price_per_day}
          <span className="text-muted text-xs font-body">/day</span>
        </p>
      </div>
    </Link>
  );
}
