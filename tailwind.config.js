/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#17567E",
          50: "#235e84",
          100: "#457898",
          200: "#6891ab",
          300: "#8babbe",
          400: "#aec4d2",
          500: "#17567E",
          600: "#116D92",
          700: "#124565",
          800: "#0E344C",
          900: "#092232",
        },
        secondary: "#38CDA1",
        orange: "#FF6433",
        lightpink: "#E9353533",
        red: "#E93535",
        lightash: "#969696",
      },
      screens: {
        print: { raw: "print" },
        mobile: { max: "635px" },
        tablet: { max: "1200px" },
        desktop: { max: "1280px" },
        "large-screen": { max: "1536px" },
      },
      fontFamily: {
        Merriweather: ["Merriweather", "serif"],
        museo: ["MuseoModerno", "sans"],
        manrope: ["Manrope", "sans"],
        poppins: ["Poppins"],
        Raleway: ["Raleway", "sans"],
        Museo: ["museo-sans", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      keyframes: {
        "open-menu": {
          "0%": { transform: "scaleX(0)" },
          "100%": { transform: "scaleX(1)" },
        },
        "drop-down": {
          "0%": { transform: "rotateX(-90deg)", opacity: "0" },
          "50%": { transform: "rotateX(20deg)" },
          "100%": { transform: "rotateX(0deg)", opacity: "1" },
        },
        "nav-show": {
          "0%": { opacity: "0" },
          "50%": { opacity: "0.5" },
          "100%": { opacity: "1" },
        },
      },
      animation: {
        "open-menu": "open-menu 0.5s ease-in-out forwards",
        "drop-down": "drop-down 0.3s  ease-in-out forwards ",
        "nav-show": "nav-show 0.3s  ease-in-out forwards ",
        "spin-slow": "spin 3s linear infinite",
      },
    },
  },
  plugins: [],
};
