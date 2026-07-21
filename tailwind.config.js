/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
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
          DEFAULT: "#0a0a0a",
          soft: "#111111",
          elev: "#161616",
          card: "#0d0d0d",
        },
        border: {
          subtle: "rgba(255,255,255,0.06)",
          DEFAULT: "rgba(255,255,255,0.10)",
          strong: "rgba(255,255,255,0.16)",
        },
        fg: {
          DEFAULT: "#ededed",
          muted: "#9ca3af",
          dim: "#6b7280",
        },
        accent: {
          DEFAULT: "#5eead4", // teal-300
          glow: "rgba(94, 234, 212, 0.18)",
          deep: "#14b8a6",
        },
        purple: {
          accent: "#a78bfa",
        },
      },
      backgroundImage: {
        "grid-fade":
          "radial-gradient(circle at center, rgba(255,255,255,0.04) 1px, transparent 1px)",
        "hero-glow":
          "radial-gradient(ellipse 80% 50% at 50% -20%, rgba(94, 234, 212, 0.15), transparent)",
        "card-glow":
          "radial-gradient(ellipse 60% 50% at 50% 0%, rgba(167, 139, 250, 0.10), transparent)",
      },
      boxShadow: {
        "glow-accent": "0 0 0 1px rgba(94,234,212,0.2), 0 8px 30px rgba(94,234,212,0.10)",
        "card": "0 1px 0 rgba(255,255,255,0.04) inset, 0 0 0 1px rgba(255,255,255,0.06)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s ease-out forwards",
        "pulse-slow": "pulse 4s ease-in-out infinite",
        "shimmer": "shimmer 2.4s linear infinite",
        float: "float 6s ease-in-out infinite",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-6px)" },
        },
      },
    },
  },
  plugins: [],
};
