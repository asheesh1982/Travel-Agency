// Central place for brand and contact info. Override any of these by setting
// the matching VITE_ variable in frontend/.env (or as a Cloudflare build
// variable) — no code changes needed.

export const siteConfig = {
  name: 'Shalom Tours and Travels',
  tagline: 'Blessed Departures, Joyful Returns.',
  phone: import.meta.env.VITE_CONTACT_PHONE || '+91 9019079909',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'shalomtourandtravel777@gmail.com',
  // Digits only, with country code, no spaces/+/dashes — e.g. 15550102030
  whatsapp: import.meta.env.VITE_WHATSAPP_NUMBER || '919019079909',
  currency: import.meta.env.VITE_CURRENCY || 'Rs.',
};
