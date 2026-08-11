import { NavLink, Outlet } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext.jsx';
import { siteConfig } from '../../config/site.js';

export default function AdminLayout() {
  const { logout } = useAuth();
  const linkClass = ({ isActive }) => (isActive ? 'text-gold' : 'hover:text-gold transition');

  return (
    <div className="min-h-screen flex">
      <aside className="w-56 bg-surface border-r border-gold/20 text-ink p-6 space-y-4 shrink-0">
        <div className="flex items-center gap-2 mb-8">
          <img src="/logo-icon.jpg" alt="" className="h-8 w-8 rounded-full object-cover border border-gold/40" />
          <p className="font-display text-base leading-tight">{siteConfig.name}</p>
        </div>
        <nav className="flex flex-col gap-3 text-sm">
          <NavLink to="/admin" end className={linkClass}>
            Dashboard
          </NavLink>
          <NavLink to="/admin/cars" className={linkClass}>
            Fleet
          </NavLink>
          <NavLink to="/admin/bookings" className={linkClass}>
            Bookings
          </NavLink>
          <button onClick={logout} className="text-left hover:text-gold transition mt-8">
            Log out
          </button>
        </nav>
      </aside>
      <main className="flex-1 bg-cream p-8">
        <Outlet />
      </main>
    </div>
  );
}
