import { siteConfig } from '../config/site.js';

export default function Footer() {
  return (
    <footer className="bg-surface border-t border-gold/20 mt-16">
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col md:flex-row justify-between gap-8">
        <div className="flex items-center gap-3">
          <img src="/logo-icon.jpg" alt="" className="h-12 w-12 rounded-full object-cover border border-gold/40" />
          <div>
            <p className="font-display text-lg text-gold">{siteConfig.name}</p>
            <p className="text-xs text-muted italic">{siteConfig.tagline}</p>
          </div>
        </div>
        <div className="text-sm text-muted space-y-1">
          <p>
            Call us:{' '}
            <a href={`tel:${siteConfig.phone}`} className="text-cream hover:text-gold transition">
              {siteConfig.phone}
            </a>
          </p>
          <p>
            Email:{' '}
            <a href={`mailto:${siteConfig.email}`} className="text-cream hover:text-gold transition">
              {siteConfig.email}
            </a>
          </p>
          <p className="pt-2">&copy; {new Date().getFullYear()} {siteConfig.name}. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
