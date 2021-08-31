module.exports = {
  purge: [
    './src/**/*.html',
    './src/**/*.js',
  ],
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
