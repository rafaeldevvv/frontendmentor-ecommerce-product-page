const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx}", "./index.html"],
  theme: {
    colors: {
      orange: "hsl(26, 100%, 55%)",
      paleOrange: "hsl(25, 100%, 94%)",
      darkBlue: "hsl(220, 13%, 13%)",
      grayishBlue: "hsl(220, 14%, 75%)",
      darkGrayishBlue: "hsl(219, 9%, 45%)",
      lightGrayishBlue: "hsl(223, 64%, 98%)",
      gray: "#69707D",
      white: "#fff",
      black: "#000"
    },
    container: {
      center: true,
      padding: "2rem",
      screens: {
        xl: "64rem",
      }
    },
    fontFamily: {
      sans: ['"Kumbh Sans"', ...defaultTheme.fontFamily.sans]
    },
    extend: {
      lineHeight: {
        '0': '0'
      },
      spacing: {
        '18': '4.5rem'
      }
    },
  },
  plugins: [],
}

