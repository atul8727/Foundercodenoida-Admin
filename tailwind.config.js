/** @type {import('tailwindcss').Config} */
import plugin from "tailwindcss/plugin";
import { BRAND_FONTS, BRAND_RADII, toCssVars, tailwindColors, tailwindShadows } from "./src/styles/theme.js";

export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: tailwindColors(),
      fontFamily: { sans: BRAND_FONTS.sans },
      borderRadius: BRAND_RADII,
      boxShadow: tailwindShadows(),
      keyframes: {
        "fade-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "slide-up": { from: { opacity: "0", transform: "translateY(8px)" }, to: { opacity: "1", transform: "translateY(0)" } },
      },
      animation: {
        "fade-in": "fade-in 150ms ease-out",
        "slide-up": "slide-up 200ms ease-out",
      },
    },
  },
  plugins: [
    // Writes the theme tokens as CSS variables for light (:root) and dark (.dark)
    plugin(({ addBase }) => {
      addBase({ ":root": toCssVars("light"), ".dark": toCssVars("dark") });
    }),
  ],
};
