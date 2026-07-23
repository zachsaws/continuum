/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Display",
          "SF Pro Text",
          "Inter",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "ui-sans-serif",
          "system-ui",
          "sans-serif",
        ],
        mono: [
          "SF Mono",
          "ui-monospace",
          "JetBrains Mono",
          "Geist Mono",
          "SFMono-Regular",
          "Menlo",
          "monospace",
        ],
      },
      fontSize: {
        // Display scale, tuned per Apple HIG: tight leading + negative tracking at large sizes
        "display-1": ["clamp(2.75rem, 5.5vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.022em", fontWeight: "600" }],
        "display-2": ["clamp(2rem, 3.6vw, 2.75rem)", { lineHeight: "1.1", letterSpacing: "-0.018em", fontWeight: "600" }],
        "headline": ["clamp(1.5rem, 2.2vw, 1.875rem)", { lineHeight: "1.18", letterSpacing: "-0.012em", fontWeight: "600" }],
        "title": ["1.25rem", { lineHeight: "1.3", letterSpacing: "-0.005em", fontWeight: "600" }],
        "body": ["1.0625rem", { lineHeight: "1.6", letterSpacing: "0" }],
        "small": ["0.875rem", { lineHeight: "1.5", letterSpacing: "0" }],
        "micro": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.04em" }],
      },
      colors: {
        bg: {
          DEFAULT: "#FFFFFF",          // pure white — Apple primary bg
          soft: "#FBFAF7",            // barely-warm grouped bg
          elev: "#F5F5F4",            // card-elev
          card: "#FFFFFF",            // same as page
        },
        border: {
          subtle: "rgba(0,0,0,0.06)",
          DEFAULT: "rgba(0,0,0,0.10)",
          strong: "rgba(0,0,0,0.18)",
        },
        fg: {
          DEFAULT: "#1D1D1F",          // Apple primary text
          muted: "#6E6E73",            // Apple secondary
          dim: "#AEAEB2",             // Apple tertiary
        },
        accent: {
          DEFAULT: "#d97a5c",          // Continuum brand (warm peach)
          glow: "rgba(217, 122, 92, 0.10)",
          deep: "#b85a3c",
        },
      },
      backgroundImage: {
        "hero-warm":
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(217,122,92,0.06), transparent)",
      },
      boxShadow: {
        // Apple-style soft elevation, not harsh
        "apple-1": "0 1px 2px rgba(0,0,0,0.04), 0 0 0 1px rgba(0,0,0,0.04)",
        "apple-2": "0 4px 12px rgba(0,0,0,0.06), 0 0 0 1px rgba(0,0,0,0.04)",
        "apple-3": "0 12px 32px rgba(0,0,0,0.08), 0 0 0 1px rgba(0,0,0,0.04)",
      },
      borderRadius: {
        card: "20px",
      },
      animation: {
        "fade-up": "fadeUp 0.7s cubic-bezier(0.2, 0.8, 0.2, 1) both",
        "fade-in": "fadeIn 0.6s ease-out both",
        "press": "press 120ms ease-out",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(12px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        press: {
          "0%": { transform: "scale(1)" },
          "100%": { transform: "scale(0.97)" },
        },
      },
    },
  },
  plugins: [],
};
