/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        gold: { DEFAULT: '#D4A62B', light: '#F3D98B', dark: '#A67C1E' },
        coral: { DEFAULT: '#FF6A4C', dark: '#E5502F', light: '#FFE4DA' },
        teal: { DEFAULT: '#0F8B8D', light: '#DFF3F2', dark: '#0B6567' },
        ink: '#2A2416',
        cream: '#FFFBF2',
        surface: '#FFFFFF',
        muted: '#8A8168',
      },
      fontFamily: {
        display: ['"Playfair Display"', 'serif'],
        body: ['Inter', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'monospace'],
      },
    },
  },
  plugins: [],
};
