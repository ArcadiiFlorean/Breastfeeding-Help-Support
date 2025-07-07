/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      spacing: {
        48: "12rem", // 192px
      },

      fontFamily: {
        fjalla: ['"Fjalla One"', "sans-serif"],
        robotoCondensed: ['"Roboto Condensed"', "sans-serif"],
        cantata: ['"Cantata One"', "serif"],
        pinyon: ['"Pinyon Script"', "cursive"],
      },
      screens: {
        phone: "480px", // Telefoane mici
        tabletSm: "768px", // Tablete mici
        tablet820: "820px", // 👈 Nou breakpoint exact pentru 820px
        tabletMd: "853px", // Ecran personalizat
        tablet: "1024px", // Tablete mari
        laptop: "1280px", // Laptopuri
        lg: "1440px", // Desktop mare
      },
    },
  },
  plugins: [],
};
