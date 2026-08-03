import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./content/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#123C2C",
          dark: "#0B2A1E",
        },
        secondary: "#C89B3C",
        accent: "#E6C875",
        background: "#FAF8F2",
        surface: {
          DEFAULT: "#FFFFFF",
          soft: "#F3F0E8",
        },
        text: {
          DEFAULT: "#18201C",
          muted: "#66706A",
        },
        border: "#DDD8CB",
        success: "#247A52",
        warning: "#B7791F",
        error: "#B42318",
      },
      fontFamily: {
        heading: ["var(--font-manrope)", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
        arabic: ["var(--font-noto-naskh)", "Traditional Arabic", "serif"],
      },
    },
  },
  plugins: [],
};

export default config;
