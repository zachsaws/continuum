/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "PingFang SC",
          "Hiragino Sans GB",
          "Microsoft YaHei",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "Segoe UI",
          "Roboto",
          "sans-serif",
        ],
        mono: [
          "JetBrains Mono",
          "Geist Mono",
          "ui-monospace",
          "SFMono-Regular",
          "Menlo",
          "Monaco",
          "Consolas",
          "monospace",
        ],
      },
      colors: {
        bg: {
          DEFAULT: "#FAF6F0", // paper warm cream
          soft: "#F4EEE3", // slightly darker for hover / subtle elev
          elev: "#FFFFFF", // rare elevated surfaces (use sparingly)
          card: "#FAF6F0", // same as page, no separate card bg
        },
        border: {
          subtle: "rgba(31,26,20,0.08)",
          DEFAULT: "rgba(31,26,20,0.12)",
          strong: "rgba(31,26,20,0.20)",
        },
        fg: {
          DEFAULT: "#1f1a14", // deep warm gray (not pure black)
          muted: "#7a6f63", // warm gray for body
          dim: "#a89c8e", // lighter warm gray for hints
        },
        accent: {
          DEFAULT: "#d97a5c", // ink-stamp orange (used SPARINGLY)
          glow: "rgba(217, 122, 92, 0.10)",
          deep: "#b85a3c",
        },
      },
      backgroundImage: {
        "subtle-dots":
          "radial-gradient(circle at center, rgba(31,26,20,0.04) 1px, transparent 1px)",
        "hero-warm":
          "radial-gradient(ellipse 70% 50% at 50% 0%, rgba(217,122,92,0.08), transparent)",
      },
      borderRadius: {
        // softer, paper-like; no sharp corners
        card: "12px",
      },
    },
  },
  plugins: [],
};
