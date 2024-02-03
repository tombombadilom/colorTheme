// rollup.config.js
import postcss from "rollup-plugin-postcss";

export default {
  plugins: [
    postcss({
      plugins: ["postcss-import", "csssnano", "autoprefixer"],
    }),
  ],
};
