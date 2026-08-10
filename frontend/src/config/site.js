// Central place for brand and contact info. Override any of these by setting
// the matching VITE_ variable in frontend/.env — no code changes needed.

export const siteConfig = {
  name: 'Shalom Tours and Travels',
  tagline: 'Blessed Departures, Joyful Returns.',
  phone: import.meta.env.VITE_CONTACT_PHONE || '+1 (555) 010-2030',
  email: import.meta.env.VITE_CONTACT_EMAIL || 'bookings@shalomtravels.com',
};
