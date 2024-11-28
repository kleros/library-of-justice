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
      base: ["1rem", "1.188rem"],
      md: ["1.25rem", "1.3rem"],
      lg: ["1.5rem", "1.813rem"],
      xl: ["2rem", "2.375rem"],
      "2xl": ["3rem", "3.625rem"],
      "3xl": ["4rem", "4.813rem"],
      "4xl": ["6rem", "7.188rem"],
    },
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        "primary-text": "#333333",
        "secondary-text": "#999999",
        stroke: "#e5e5e5",
        "primary-purple": "#4D00B4",
        "secondary-purple": "#9013FE",
        "primary-blue": "#009AFF",
        "secondary-blue": "#7BCBFF",
        "light-background": "#FAFBFC",
        "white-background": "#FFFFFF",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
export default config;
