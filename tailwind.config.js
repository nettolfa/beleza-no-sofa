/** @type {import("tailwindcss").Config} */
module.exports = {
  content: ["./index.html", "./js/**/*.js"],
  theme: {
    extend: {
      colors: { ground:'#C1BCB9', paper:'#F7F6F4', stone:'#E9E7E4', ink:'#1D1B19', soft:'#55504B', gold:'#7E5F1C', goldl:'#C9A24B' },
      fontFamily: { display:['Cormorant','serif'], body:['"Libre Franklin"','sans-serif'] }
    },
  },
  plugins: [],
};
