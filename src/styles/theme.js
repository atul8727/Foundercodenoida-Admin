/**
 * Founder Code - THE ONLY place where colors live.
 *
 * Edit a hex value here and the whole app (light + dark) changes.
 * tailwind.config.js reads this file, turns every token into a CSS variable
 * (--c-<name>) and maps it to a Tailwind color, e.g. "primary-soft" -> bg-primary-soft.
 *
 * Brand: Primary Blue #14548F (dark #4A90D9), Accent Red #E03C3C, Success Green #2BAE47.
 */

export const THEME = {
  light: {
    colors: {
      page: "#90E0EF", // app background (brand sky blue)
      surface: "#FFFFFF", // cards, sidebar, topbar, tables, inputs
      "surface-2": "#E0F6FA", // table head, hover, subtle fills
      line: "#A9DCE8", // borders
      "line-strong": "#4F9DB3", // input borders
      ink: "#0B2239", // main text
      muted: "#3D5266", // secondary text
      primary: "#14548F",
      "primary-hover": "#1F6FB5",
      "primary-soft": "#D3F1F8",
      "on-solid": "#FFFFFF", // text on solid primary / success / danger fills
      danger: "#E03C3C",
      success: "#2BAE47",
      warning: "#B45F06", // darker amber so badge text is readable on white
      info: "#7C5CE0",
      neutral: "#7A8798",
      "logo-bg": "#FFFFFF", // the logo has blue text: dark mode puts it on this card
    },
    shadows: {
      card: "0 1px 3px rgba(11, 34, 57, 0.08), 0 8px 22px rgba(11, 34, 57, 0.08)",
      pop: "0 12px 32px rgba(11, 34, 57, 0.2)",
    },
  },
  dark: {
    colors: {
      page: "#0B1320",
      surface: "#121C2D",
      "surface-2": "#1A2740",
      line: "#26364F",
      "line-strong": "#34486A",
      ink: "#E8EEF6",
      muted: "#93A3B8",
      primary: "#4A90D9",
      "primary-hover": "#6AA6E6",
      "primary-soft": "#16304D",
      "on-solid": "#0B1320",
      danger: "#FF6B6B",
      success: "#4ADE80",
      warning: "#FBBF24",
      info: "#A18BF0",
      neutral: "#9AA8BA",
      "logo-bg": "#FFFFFF",
    },
    shadows: {
      card: "0 8px 24px rgba(0, 0, 0, 0.35)",
      pop: "0 16px 40px rgba(0, 0, 0, 0.5)",
    },
  },
};

export const BRAND_FONTS = {
  sans: ["Outfit", "Segoe UI", "system-ui", "-apple-system", "BlinkMacSystemFont", "Roboto", "sans-serif"],
};

export const BRAND_RADII = {
  sm: "0.375rem", // 6px
  md: "0.625rem", // 10px  buttons, inputs
  lg: "0.75rem", // 12px
  xl: "0.875rem", // 14px  cards, modals
  full: "9999px",
};

// ---- helpers used by tailwind.config.js (not by the app) ----
const hexToChannels = (hex) => {
  const h = hex.replace("#", "");
  return [0, 2, 4].map((i) => parseInt(h.slice(i, i + 2), 16)).join(" ");
};

export const toCssVars = (mode) => {
  const vars = { "color-scheme": mode === "dark" ? "dark" : "light" };
  Object.entries(THEME[mode].colors).forEach(([k, v]) => (vars[`--c-${k}`] = hexToChannels(v)));
  Object.entries(THEME[mode].shadows).forEach(([k, v]) => (vars[`--shadow-${k}`] = v));
  return vars;
};

export const tailwindColors = () =>
  Object.fromEntries(Object.keys(THEME.light.colors).map((k) => [k, `rgb(var(--c-${k}) / <alpha-value>)`]));

export const tailwindShadows = () =>
  Object.fromEntries(Object.keys(THEME.light.shadows).map((k) => [k, `var(--shadow-${k})`]));