module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'futuristic-purple': '#6D28D9',
        'futuristic-blue': '#3B82F6',
        'futuristic-pink': '#EC4899',
        'futuristic-teal': '#2DD4BF',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};