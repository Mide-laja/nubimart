import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#f6f7f2",
          100: "#e9ebe0",
          200: "#d3d8c2",
          300: "#b5be9d",
          400: "#8f9c6d",
          500: "#6e7c48",
          600: "#4B5320", // Official Nubimart Primary Green
          700: "#3d431a",
          800: "#2f3414",
          900: "#22260f",
          950: "#131608",
        },
        nubigreen: {
          50: "#f6f7f2",
          100: "#e9ebe0",
          200: "#d3d8c2",
          300: "#b5be9d",
          400: "#8f9c6d",
          500: "#6e7c48",
          600: "#4B5320",
          700: "#3d431a",
          800: "#2f3414",
          900: "#22260f",
          950: "#131608",
        },
        navy: {
          50: "#f7f8f5",
          100: "#eceee6",
          200: "#d9ded0",
          300: "#b9c2aa",
          400: "#8e997b",
          500: "#636d53",
          600: "#474f3b",
          700: "#343a2b",
          800: "#22261c",
          900: "#151811",
          950: "#0c0e0a", // Deep Charcoal / Olive Obsidian
        },
        gold: {
          50: "#fffdf0",
          100: "#fef9d6",
          200: "#fdf2ad",
          300: "#fce77a",
          400: "#fbd943",
          500: "#FBB102", // Official Nubimart Accent Gold
          600: "#de9500",
          700: "#b57300",
          800: "#8c5400",
          900: "#663b00",
          950: "#3d2000",
        },
      },
      fontFamily: {
        sans: ["Montserrat", "Inter", "-apple-system", "BlinkMacSystemFont", "Segoe UI", "Roboto", "sans-serif"],
      },
      boxShadow: {
        card: "0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)",
        premium: "0 10px 25px -5px rgba(11, 25, 44, 0.08), 0 8px 10px -6px rgba(11, 25, 44, 0.04)",
        dropdown: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)",
      },
    },
  },
  plugins: [],
};

export default config;
