const tailwindcss = require("tailwindcss");
module.exports = {
  //   plugins: ["postcss-preset-env", tailwindcss],
  plugins: [
    "postcss-preset-env",
    require("tailwindcss"),
    require("autoprefixer"),
  ],
};
