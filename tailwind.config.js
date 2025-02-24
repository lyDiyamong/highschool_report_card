/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        khmer: ["Moul", "serif"],
        arsenal: ["Arsenal SC", "sans-serif"],
      },
    },
  },
  plugins: [],
};
