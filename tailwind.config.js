/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        grey: "#777777",
        customBlack: " #262626",
        primary: "#0A96CC",
      },
    },
  },
  plugins: [],
};
