/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg": "#1c1a1e",
        "secondary": "#2d2d2e",
        "third": "#141414",
        "blue": "#5656c2",
        "red": "#f84743",
        "white": "#f9f9f9",
        "lightgray": "#bfbfbf",
      },
      backgroundColor: {
        "secondary": "#2d2d2e",
        "third": "#141414",
        "blue": "#5656c2",
        "red": "#f84743"
      },
      borderColor: {
        "red": "#f84743",
        "blue": "#5656c2",
        "gray": "#3e3e3e",
      },
      screens: {
        "phone": "490px"
      }
    },
  },
  plugins: [],
}

