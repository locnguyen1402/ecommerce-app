/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ['./app/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      colors: {
        // Primary and secondary colors that can be easily changed
        primary: {
          DEFAULT: '#F05365', // The red color from your login button
          light: '#F47983',
          dark: '#D3394A',
        },
        secondary: {
          DEFAULT: '#3B82F6', // Blue color
          light: '#60A5FA',
          dark: '#2563EB',
        },
        // You can add more theme colors as needed
        background: '#FFFFFF',
        surface: '#F5F5F5',
        text: {
          primary: '#000000',
          secondary: '#6B7280',
        },
      },
    },
  },
  plugins: [],
};
