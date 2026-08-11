import { siteConfig } from '../config/site.js';

export default function ContactFab() {
  const waMessage = encodeURIComponent(`Hi! I'd like to know more about renting a car with ${siteConfig.name}.`);

  return (
    <div className="fixed bottom-5 right-5 z-40 flex flex-col gap-3">
      <a
        href={`https://wa.me/${siteConfig.whatsapp}?text=${waMessage}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat on WhatsApp"
        className="w-14 h-14 rounded-full bg-[#25D366] text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
      >
        <svg viewBox="0 0 32 32" className="w-7 h-7" fill="currentColor" aria-hidden="true">
          <path d="M16 2.9C8.8 2.9 2.9 8.7 2.9 16c0 2.6.7 5 2 7.1L3 29l6.1-1.9c2 1.1 4.3 1.7 6.9 1.7 7.2 0 13.1-5.8 13.1-13.1S23.2 2.9 16 2.9zm0 23.8c-2.3 0-4.5-.6-6.4-1.8l-.5-.3-4.1 1.3 1.3-4-.3-.5c-1.2-2-1.9-4.2-1.9-6.5 0-6 4.9-10.9 10.9-10.9S26.9 10 26.9 16 22 26.7 16 26.7zm6-8.2c-.3-.2-1.9-.9-2.2-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.9-.4-1.9-1-2.7-1.9-.7-.7-1.2-1.5-1.6-2.2-.1-.3 0-.5.1-.7.2-.2.4-.5.6-.7.1-.2.2-.4.1-.6-.1-.2-.7-1.8-1-2.4-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4-.3.3-1.1 1.1-1.1 2.6s1.1 3 1.3 3.2c.2.2 2 3.1 4.9 4.3 2.9 1.2 2.9.8 3.4.7.5-.1 1.6-.6 1.8-1.3.2-.6.2-1.1.2-1.2-.1-.1-.3-.2-.6-.4z" />
        </svg>
      </a>
      <a
        href={`tel:${siteConfig.phone}`}
        aria-label="Call us"
        className="w-14 h-14 rounded-full bg-coral text-white flex items-center justify-center shadow-lg hover:scale-105 transition"
      >
        <svg viewBox="0 0 24 24" className="w-6 h-6" fill="currentColor" aria-hidden="true">
          <path d="M6.6 10.8c1.4 2.8 3.8 5.1 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.2.5 2.5.8 3.9.8.6 0 1 .4 1 1v3.4c0 .6-.4 1-1 1C9.6 21.2 2.8 14.4 2.8 5.7c0-.6.4-1 1-1H7.2c.6 0 1 .4 1 1 0 1.4.3 2.7.8 3.9.1.4 0 .8-.2 1z" />
        </svg>
      </a>
    </div>
  );
}
