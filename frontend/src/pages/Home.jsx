import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar.jsx';
import RoadDivider from '../components/RoadDivider.jsx';
import { siteConfig } from '../config/site.js';

export default function Home() {
  return (
    <div>
      <section className="bg-ink text-cream pt-14 pb-14 px-4">
        <div className="max-w-6xl mx-auto flex flex-col items-center text-center gap-8">
          <img
            src="/logo-full.jpg"
            alt={siteConfig.name}
            className="w-64 md:w-80 rounded-2xl border border-gold/30 shadow-2xl shadow-black/60"
          />
          <h1 className="font-display text-4xl md:text-5xl text-gold">Go anywhere. Rent the ride.</h1>
          <p className="max-w-xl text-muted">{siteConfig.tagline}</p>
          <SearchBar />
        </div>
        <div className="mt-12">
          <RoadDivider />
        </div>
      </section>

      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="font-display text-2xl mb-6 text-cream">Popular categories</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {['Economy', 'SUV', 'Luxury', 'Van'].map((cat) => (
            <Link
              key={cat}
              to={`/cars?category=${cat.toLowerCase()}`}
              className="bg-surface border border-white/10 rounded-2xl p-6 text-center hover:border-gold/40 hover:-translate-y-0.5 transition"
            >
              <p className="font-display text-lg text-cream">{cat}</p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
