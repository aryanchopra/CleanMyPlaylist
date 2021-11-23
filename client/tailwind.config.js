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
    boxShadow: {
      custom: " 22px 64px 248px -18px rgba(29,215,97,0.54)",
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
