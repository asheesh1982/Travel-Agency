import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import RoadDivider from '../components/RoadDivider.jsx';
import { siteConfig } from '../config/site.js';

const categories = [
  { name: 'Economy', bg: 'bg-teal-light', text: 'text-teal-dark' },
  { name: 'SUV', bg: 'bg-coral-light', text: 'text-coral-dark' },
  { name: 'Luxury', bg: 'bg-gold/15', text: 'text-gold-dark' },
  { name: 'Van', bg: 'bg-teal-light', text: 'text-teal-dark' },
];

export default function Home() {
  return (
    <div>
      <section className="bg-gradient-to-b from-coral/10 via-gold/10 to-cream pt-14 pb-14 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-8">
          <img
            src="/logo-full.jpg"
            alt={siteConfig.name}
            className="w-64 md:w-80 rounded-2xl border border-gold/30 shadow-2xl shadow-black/10"
          />
          <h1 className="font-display text-4xl md:text-5xl text-coral">Go anywhere. Rent the ride.</h1>
          <p className="max-w-xl text-muted">{siteConfig.tagline}</p>
          <SearchBar />
        </div>
        <div className="mt-12">
          <RoadDivider />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl mb-6 text-ink">Popular categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.name}
              to={`/cars?category=${cat.name.toLowerCase()}`}
              className={`${cat.bg} border border-black/5 rounded-2xl p-6 text-center hover:-translate-y-0.5 hover:shadow-md transition`}
            >
              <p className={`font-display text-lg ${cat.text}`}>{cat.name}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}

