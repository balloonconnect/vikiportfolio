import type { Config } from "tailwindcss";
const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  darkMode: ["selector", '[data-theme="dark"]'],
  theme: {
    extend: {
      colors: { bg: "var(--bg)", surface: "var(--surface)", fg: "var(--fg)", muted: "var(--fg-muted)", border: "var(--border)", tile: "var(--tile)", secondary: "var(--secondary)" },
      fontFamily: { sans: ["Lato", "ui-sans-serif", "system-ui", "sans-serif"] },
      transitionTimingFunction: { out: "cubic-bezier(.22,1,.36,1)", spring: "cubic-bezier(.34,1.56,.64,1)" },
      maxWidth: { page: "1440px" },
    },
  },
  plugins: [],
};
export default config;
