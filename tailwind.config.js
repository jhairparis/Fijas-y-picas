module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './index.html'],
  darkMode: false, // or 'media' or 'class'
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
