const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    fontFamily: {
      outfit: ["Outfit", "sans-serif"],
      Inter: ["Inter", "sans-serif"],
    },
    screens: {
      "2xsm": "375px",
      xsm: "425px",
      "3xl": "2000px",
      ...defaultTheme.screens,
    },
    extend: {
      backgroundColor: {
        primary: "#FFFFFF",
        secondary: "#2D336B",
        customBlue: "rgba(169, 181, 223, 0.2)",
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("autoprefixer")],
};
