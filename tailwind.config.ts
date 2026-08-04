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
      boxShadow: {
        soft: "0 2px 8px -2px rgba(18, 60, 44, 0.08), 0 1px 2px -1px rgba(18, 60, 44, 0.06)",
        card: "0 4px 16px -4px rgba(18, 60, 44, 0.12), 0 2px 6px -2px rgba(18, 60, 44, 0.08)",
        "card-hover": "0 12px 32px -8px rgba(18, 60, 44, 0.22), 0 4px 12px -2px rgba(18, 60, 44, 0.12)",
        gold: "0 8px 24px -6px rgba(200, 155, 60, 0.45)",
        "inner-glow": "inset 0 1px 0 0 rgba(255,255,255,0.08)",
      },
      keyframes: {
        "fade-in-up": {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        "fade-in": {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      animation: {
        "fade-in-up": "fade-in-up 0.6s ease-out both",
        "fade-in": "fade-in 0.5s ease-out both",
      },
    },
  },
  plugins: [],
};

export default config;
