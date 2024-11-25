/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#1877F2", // Facebook blue
        secondary: "#242526", // Modern dark mode
        light: "#F0F2F5", // Light background
        accent: "#42b72a", // Green for active buttons
      },
    },
  },
  plugins: [],
};
