/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        gold: "#D4AF37",
        "rose-gold": "#B76E79",
        ivory: "#FFFFF0",
        blush: "#FFE4E1",
        champagne: "#F1E8D8",
      },
      fontFamily: {
        playfair: ["Playfair Display", "serif"],
        garamond: ["Cormorant Garamond", "serif"],
        vibes: ["Great Vibes", "cursive"],
        boheme: ["Calligrafico Boheme Floreal", "Great Vibes", "cursive"],
        lora: ["Lora", "serif"],
        raleway: ["Raleway", "sans-serif"],
        bodoni: ["Bodoni Moda", "serif"],
      },
      letterSpacing: {
        widest: "0.15em",
      },
    },
  },
  plugins: [],
};
