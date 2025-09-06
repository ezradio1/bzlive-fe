/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // harus sesuai folder src kamu
  ],
  theme: {
    extend: {
      colors: {
        secondary: "#FFC832",
      },
      fontFamily: {
        'inter': ['Inter', 'system-ui', 'sans-serif'],
        'poppins': ['Poppins', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
