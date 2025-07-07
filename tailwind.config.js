/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        fjalla: ['"Fjalla One"', "sans-serif"],
        robotoCondensed: ['"Roboto Condensed"', "sans-serif"],
        cantata: ['"Cantata One"', "serif"],
        pinyon: ['"Pinyon Script"', "cursive"],
      },
      screens: {
        phone: "480px",       // Telefoane mici
        tabletSm: "768px",    // Tablete mici
        tablet: "1024px",     // Tablete mari
        laptop: "1280px",     // Laptopuri (standard Tailwind)
        lg: "1440px",         // Desktop mare
      },
    },
  },
  plugins: [],
};
