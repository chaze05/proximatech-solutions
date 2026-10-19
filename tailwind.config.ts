import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: "1rem",
      screens: { "2xl": "1280px" },
    },
    extend: {
      colors: {
        base: "#08090C",
        panel: "#10131A",
        elevated: "#161A23",
        ink: "#F5F7FA",
        secondary: "#AEB7C6",
        muted: "#77808F",
        signal: "#E11D2E",
        "signal-hover": "#FF3B4E",
        "signal-deep": "#A3121F",
        success: "#34D399",
        warning: "#FBBF24",
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      maxWidth: {
        container: "1280px",
      },
      screens: {
        xs: "480px",
      },
    },
  },
  plugins: [],
};

export default config;
