module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: 'media',
  theme: {
    extend: {
      fontFamily: {
        'init': ['"Roboto"', 'sans-serif'],
        'logo': ['"Rampart One"', 'cursive']
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
