const defaultColors = require("tailwindcss/colors");

module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    colors: {
      ...defaultColors,
      primary: "#14FFEC",
      dark: "#000",
      light: "#F8F5EE",
    },
    extend: {
      fontFamily: {
        ibmPlexSans: ['"IBM Plex Sans"', "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
      },
      screens: {
        mobile: { max: "1024px" },
        mobilesm: { max: "640px" },
        mobilemd: { max: "768px" },
      },
    },
  },
  plugins: [],
};
