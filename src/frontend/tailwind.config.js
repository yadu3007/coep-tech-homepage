import typography from "@tailwindcss/typography";
import containerQueries from "@tailwindcss/container-queries";
import animate from "tailwindcss-animate";

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ["class"],
  content: ["index.html", "src/**/*.{js,ts,jsx,tsx,html,css}"],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "var(--border)",
        input: "var(--input)",
        ring: "var(--ring)",
        background: "var(--background)",
        foreground: "var(--foreground)",
        primary: {
          DEFAULT: "var(--primary)",
          foreground: "var(--primary-foreground)",
        },
        secondary: {
          DEFAULT: "var(--secondary)",
          foreground: "var(--secondary-foreground)",
        },
        destructive: {
          DEFAULT: "var(--destructive)",
          foreground: "var(--destructive-foreground)",
        },
        muted: {
          DEFAULT: "var(--muted)",
          foreground: "var(--muted-foreground)",
        },
        accent: {
          DEFAULT: "var(--accent)",
          foreground: "var(--accent-foreground)",
        },
        popover: {
          DEFAULT: "var(--popover)",
          foreground: "var(--popover-foreground)",
        },
        card: {
          DEFAULT: "var(--card)",
          foreground: "var(--card-foreground)",
        },
        chart: {
          1: "var(--chart-1)",
          2: "var(--chart-2)",
          3: "var(--chart-3)",
          4: "var(--chart-4)",
          5: "var(--chart-5)",
        },
        sidebar: {
          DEFAULT: "var(--sidebar)",
          foreground: "var(--sidebar-foreground)",
          primary: "var(--sidebar-primary)",
          "primary-foreground": "var(--sidebar-primary-foreground)",
          accent: "var(--sidebar-accent)",
          "accent-foreground": "var(--sidebar-accent-foreground)",
          border: "var(--sidebar-border)",
          ring: "var(--sidebar-ring)",
        },
        /* Brand-specific static colors (COEP color system) */
        cobalt: {
          DEFAULT: "#1648C8",   /* nav, CTAs, card accents */
          light: "#2d5fe8",
          dark: "#1238a8",
        },
        deepblue: {
          DEFAULT: "#0F3499",   /* ALL headings */
          light: "#1545c8",
          dark: "#0a2570",
        },
        midnight: {
          DEFAULT: "#081E5C",   /* footer */
          light: "#0d2870",
          dark: "#050f30",
        },
        gold: {
          DEFAULT: "#E8C42A",   /* primary buttons, active nav ONLY */
          light: "#f0d040",
          dark: "#c9a820",
        },
      },
      fontFamily: {
        /* Playfair Display for all headings */
        display: ["'Playfair Display'", "Georgia", "serif"],
        /* Source Sans 3 for body, nav, buttons */
        body: ["'Source Sans 3'", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        xs: "0 1px 2px 0 rgba(0,0,0,0.05)",
        sm: "0 2px 4px 0 rgba(0,0,0,0.08)",
        md: "0 4px 8px 0 rgba(0,0,0,0.12)",
        elevated: "0 20px 60px rgba(22,72,200,0.12)",
        subtle: "0 2px 8px 0 rgba(22,72,200,0.10)",
        card: "0 4px 24px rgba(0,0,0,0.08)",
        "card-hover": "0 12px 40px rgba(22,72,200,0.2)",
        cobalt: "0 4px 20px 0 rgba(22,72,200,0.30)",
        gold: "0 8px 24px rgba(232,196,42,0.40)",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-right": {
          from: { transform: "translateX(-100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        "slide-left": {
          from: { transform: "translateX(100%)", opacity: "0" },
          to: { transform: "translateX(0)", opacity: "1" },
        },
        ticker: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        "fade-in": {
          from: { opacity: "0" },
          to: { opacity: "1" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(20px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-32px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "scale-in": {
          from: { opacity: "0", transform: "scale(0.94)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        "shimmer": {
          "0%": { backgroundPosition: "-200% center" },
          "100%": { backgroundPosition: "200% center" },
        },
        "float": {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-right": "slide-right 0.3s ease-out",
        "slide-left": "slide-left 0.3s ease-out",
        ticker: "ticker 30s linear infinite",
        "fade-in": "fade-in 0.4s ease-out",
        "fade-up": "fade-up 0.6s cubic-bezier(0.4,0,0.2,1) both",
        "slide-in-left": "slide-in-left 0.6s cubic-bezier(0.4,0,0.2,1) both",
        "scale-in": "scale-in 0.5s cubic-bezier(0.4,0,0.2,1) both",
        "shimmer": "shimmer 2.5s linear infinite",
        "float": "float 4s ease-in-out infinite",
      },
    },
  },
  plugins: [typography, containerQueries, animate],
};
