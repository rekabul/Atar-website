import type { Config } from "tailwindcss";

/** Tokens mirror the Figma "Atar" variable collection. */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          lighter: "#EBF6F8",
          light: "#CCE8ED",
          DEFAULT: "#008EA5", // Atar/Primary/Main
        },
        secondary: {
          lighter: "#EBF0F1",
          light: "#CCD9DD",
          DEFAULT: "#004256", // Atar/Secondary/Main
          dark: "#003748",
          darker: "#002A37",
        },
        ink: {
          DEFAULT: "#080F1A", // header text color from Figma
          soft: "#525451",
          muted: "#647491", // language switch / secondary nav
        },
        grey: {
          100: "#F0F0F0",
          200: "#E3E3E3",
          600: "#969798",
        },
        success: { DEFAULT: "#0A9458", light: "#EDFAF4" },
        danger: { DEFAULT: "#FF4242", light: "#FFECEC" },
      },
      fontFamily: {
        // Euclid Circular B is the brand font; Noto Kufi Arabic is a per-glyph
        // fallback so Arabic (RTL) text shapes correctly without extra classes.
        sans: ['"Euclid Circular B"', '"Noto Kufi Arabic"', "Lato", "system-ui", "sans-serif"],
        lato: ["Lato", "system-ui", "sans-serif"],
      },
      boxShadow: {
        card: "0 6px 12px rgba(28,39,49,0.05)",
        lift: "0 17px 33px -2px rgba(28,39,49,0.08)",
      },
      maxWidth: { content: "1200px" },
      keyframes: {
        marquee: { from: { transform: "translateX(0)" }, to: { transform: "translateX(-50%)" } },
        marqueeRtl: { from: { transform: "translateX(-50%)" }, to: { transform: "translateX(0)" } },
      },
      animation: {
        marquee: "marquee 40s linear infinite",
        "marquee-rtl": "marqueeRtl 40s linear infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
