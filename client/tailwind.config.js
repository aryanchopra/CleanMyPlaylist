module.exports = {
  mode: "jit",
  purge: [
    "./public/*.html",
    "./public/*.js",
    "./public/**/*.js",
    "./src/**/*.tsx",
    "./src/**/*.html",
  ],
  preserveHtmlElements: false,
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
