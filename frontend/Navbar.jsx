import { Link, NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { siteConfig } from '../config/site.js';

export default function Navbar() {
  const { user, logout } = useAuth();

  const linkClass = ({ isActive }) => (isActive ? 'text-gold' : 'hover:text-gold transition');

  return (
    <header className="sticky top-0 z-30 bg-cream/95 backdrop-blur border-b border-gold/20">
      <div className="hidden md:flex justify-end gap-6 max-w-6xl mx-auto px-4 py-1.5 text-xs text-muted border-b border-black/5">
        <a href={`tel:${siteConfig.phone}`} className="hover:text-gold transition">
          {siteConfig.phone}
        </a>
        <a href={`mailto:${siteConfig.email}`} className="hover:text-gold transition">
          {siteConfig.email}
        </a>
      </div>
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 whitespace-nowrap">
          <img src="/logo-icon.jpg" alt="" className="h-10 w-10 rounded-full object-cover border border-gold/40" />
          <span className="font-display text-lg md:text-xl text-gold">Shalom Tours &amp; Travels</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <NavLink to="/cars" className={linkClass}>
            Browse cars
          </NavLink>
          {user ? (
            <>
              <NavLink to="/account" className={linkClass}>
                My bookings
              </NavLink>
              <button onClick={logout} className="hover:text-gold transition">
                Log out
              </button>
            </>
          ) : (
            <>
              <NavLink to="/login" className={linkClass}>
                Log in
              </NavLink>
              <Link
                to="/signup"
                className="bg-coral text-white px-4 py-2 rounded-full font-semibold hover:bg-coral-dark transition"
              >
                Sign up
              </Link>
            </>
          )}
        </nav>
      </div>
    </header>
  );
}
