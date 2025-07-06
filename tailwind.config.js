/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fjalla: ['"Fjalla One"', "sans-serif"],
        robotoCondensed: ['"Roboto Condensed"', "sans-serif"],
      },
      screens: {
        tablet: "1024px",
        lg: "1280px",
      },
    },
  },
  plugins: [],
};
