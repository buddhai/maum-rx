/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-green': '#006938',
      },
      fontFamily: {
        'scdream': ['S-Core Dream', 'sans-serif'],
      },
      screens: {
        mq450: {
          raw: "screen and (max-width: 450px)",
        },
        mq625: {
          raw: "screen and (min-width: 451px) and (max-width: 625px)",
        },
        mq675: {
          raw: "screen and (min-width: 626px) and (max-width: 675px)",
        },
      },
    },
  },
  corePlugins: {
    preflight: false,
  },
  plugins: [],
}
