import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        // Brand palette from CLAUDE.md
        brand: {
          blue: "#00CADD",
          "blue-light": "#33D4E4",
          "blue-dark": "#00A3B3",
          green: "#96CA2D",
          "green-light": "#A8D44F",
          "green-dark": "#7BA824",
          orange: "#FF6100",
          "orange-hover": "#E55800",
        },
        // Donate CTA - distinct red, reserved for donate buttons only
        donate: {
          DEFAULT: "#DC2626",
          hover: "#B91C1C",
          light: "#FEE2E2",
        },
        // Ink colors based on #333333
        ink: {
          DEFAULT: "#333333",
          secondary: "#4A4A4A",
          muted: "#6B6B6B",
          faint: "#9CA3AF",
        },
        // Surface palette - subtle blue tints based on brand blue #00CADD
        surface: {
          DEFAULT: "#F8FDFE",
          warm: "#F0FAFB",
          cool: "#E8F7F9",
          card: "#FFFFFF",
        },
        // Subtle borders with blue tint
        edge: {
          DEFAULT: "#E0F4F7",
          strong: "#C5EBF0",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "system-ui", "sans-serif"],
      },
      fontSize: {
        // Dramatic editorial scale
        "display-xl": ["clamp(3rem, 8vw, 6rem)", { lineHeight: "1", letterSpacing: "-0.02em" }],
        "display-lg": ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1.05", letterSpacing: "-0.02em" }],
        "display-md": ["clamp(2rem, 4vw, 3rem)", { lineHeight: "1.1", letterSpacing: "-0.01em" }],
        "display-sm": ["clamp(1.5rem, 3vw, 2rem)", { lineHeight: "1.2", letterSpacing: "-0.01em" }],
        // Body scale
        "body-lg": ["1.25rem", { lineHeight: "1.7" }],
        "body": ["1.0625rem", { lineHeight: "1.7" }],
        "body-sm": ["0.9375rem", { lineHeight: "1.6" }],
        "caption": ["0.8125rem", { lineHeight: "1.5" }],
        "overline": ["0.75rem", { lineHeight: "1.4", letterSpacing: "0.1em" }],
      },
      spacing: {
        // Premium spacing scale
        "18": "4.5rem",
        "22": "5.5rem",
        "26": "6.5rem",
        "30": "7.5rem",
        "34": "8.5rem",
      },
      maxWidth: {
        "prose-wide": "75ch",
        "container-sm": "640px",
        "container-md": "896px",
        "container-lg": "1152px",
        "container-xl": "1280px",
      },
      boxShadow: {
        // Refined, subtle shadows
        "subtle": "0 1px 2px rgb(0 0 0 / 0.04)",
        "soft": "0 2px 8px rgb(0 0 0 / 0.06)",
        "medium": "0 4px 16px rgb(0 0 0 / 0.08)",
        "elevated": "0 8px 32px rgb(0 0 0 / 0.1)",
        "dramatic": "0 16px 48px rgb(0 0 0 / 0.12)",
      },
      animation: {
        "fade-up": "fadeUp 0.6s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "fade-in": "fadeIn 0.4s ease forwards",
        "scale-in": "scaleIn 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
        "slide-in-right": "slideInRight 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards",
      },
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(24px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.95)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        slideInRight: {
          "0%": { opacity: "0", transform: "translateX(-16px)" },
          "100%": { opacity: "1", transform: "translateX(0)" },
        },
      },
      transitionTimingFunction: {
        "smooth": "cubic-bezier(0.16, 1, 0.3, 1)",
      },
      transitionDuration: {
        "400": "400ms",
        "600": "600ms",
      },
      backgroundImage: {
        // Premium gradients
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-editorial": "linear-gradient(180deg, transparent 0%, var(--tw-gradient-to) 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
