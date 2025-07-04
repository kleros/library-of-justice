import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    fontSize: {
      xs: ["0.75rem", "1rem"],
      sm: ["0.875rem", "1.25rem"],
      base: ["1rem", "1.5rem"],
      md: ["1.125rem", "1.75rem"],
      lg: ["1.25rem", "1.875rem"],
      xl: ["1.5rem", "2rem"],
      "2xl": ["1.875rem", "2.25rem"],
      "3xl": ["2.25rem", "2.5rem"],
      "4xl": ["3rem", "3.5rem"],
      "5xl": ["4rem", "4.5rem"],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        
        // Enhanced Purple Palette
        purple: {
          50: "#F8F4FF",
          100: "#F0E6FF",
          200: "#E0CCFF",
          300: "#C999FF",
          400: "#A855F7",
          500: "#9013FE",
          600: "#7C3AED",
          700: "#6B46C1",
          800: "#553C9A",
          900: "#4C1D95",
          950: "#2E1065",
        },
        
        // Primary Brand Colors
        "primary": {
          50: "#F5F0FF",
          100: "#EBE0FF",
          200: "#D9C7FF",
          300: "#BF9FFF",
          400: "#9F70FF",
          500: "#7C3AED",
          600: "#6B46C1",
          700: "#553C9A",
          800: "#4D00B4",
          900: "#3B0764",
          950: "#1E0A2E",
        },
        
        // Accent Colors
        "accent": {
          50: "#EFF6FF",
          100: "#DBEAFE",
          200: "#BFDBFE",
          300: "#93C5FD",
          400: "#60A5FA",
          500: "#3B82F6",
          600: "#2563EB",
          700: "#1D4ED8",
          800: "#1E40AF",
          900: "#1E3A8A",
        },
        
        // Neutral Colors
        "neutral": {
          50: "#FAFAFA",
          100: "#F5F5F5",
          200: "#E5E5E5",
          300: "#D4D4D4",
          400: "#A3A3A3",
          500: "#737373",
          600: "#525252",
          700: "#404040",
          800: "#262626",
          900: "#171717",
          950: "#0A0A0A",
        },
        
        // Semantic Colors
        success: {
          50: "#F0FDF4",
          500: "#22C55E",
          600: "#16A34A",
        },
        warning: {
          50: "#FFFBEB",
          500: "#F59E0B",
          600: "#D97706",
        },
        error: {
          50: "#FEF2F2",
          500: "#EF4444",
          600: "#DC2626",
        },
        
        // Legacy color mappings for compatibility
        "primary-text": "#1F2937",
        "secondary-text": "#6B7280",
        "stroke": "#E5E7EB",
        "primary-purple": "#4D00B4",
        "secondary-purple": "#9013FE",
        "primary-blue": "#3B82F6",
        "secondary-blue": "#60A5FA",
        "light-background": "#F9FAFB",
        "white-background": "#FFFFFF",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      boxShadow: {
        'soft': '0 2px 15px -3px rgba(0, 0, 0, 0.07), 0 10px 20px -2px rgba(0, 0, 0, 0.04)',
        'medium': '0 4px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 20px -5px rgba(0, 0, 0, 0.04)',
        'strong': '0 10px 40px -10px rgba(0, 0, 0, 0.15), 0 20px 25px -5px rgba(0, 0, 0, 0.1)',
        'purple': '0 4px 25px -5px rgba(139, 92, 246, 0.3), 0 10px 20px -5px rgba(139, 92, 246, 0.1)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: 0 },
          '100%': { transform: 'translateY(0)', opacity: 1 },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: 0 },
          '100%': { transform: 'scale(1)', opacity: 1 },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
