/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F0EEFD",
          100: "#E1DEFA",
          200: "#C2BDF5",
          300: "#A49CF1",
          400: "#857BEC",
          500: "#675AE7",
          600: "#5349BD",
          700: "#403793",
          800: "#2C266A",
          900: "#191440",
          950: "#0F0C2B",
        },
        natural: {
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
        background: "#F8F9FF",
        success: "#10B981",
        error: "#EF4444",
      },
    },
  },
  plugins: [],
};
