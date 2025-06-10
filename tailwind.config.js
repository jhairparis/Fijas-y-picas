module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}', // Added for Next.js App Router
    './pages/**/*.{js,ts,jsx,tsx,mdx}', // Added for Next.js Pages Router
    './components/**/*.{js,ts,jsx,tsx,mdx}', // Added for components
    './index.html'
  ],
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
