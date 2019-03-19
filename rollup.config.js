import css from "rollup-plugin-css-only";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";
import { terser } from "rollup-plugin-terser";

const production = process.env.NODE_ENV === "production";

export default {
  external: ["react", "react-dom"],
  input: "src/main.js",
  plugins: [
    css({ output: "dist/main.css" }),
    babel(),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    }),
    // some fun facts about `compress: false`:
    // https://github.com/terser-js/terser#terser-fast-minify-mode
    production && terser({ compress: false })
  ],
  output: {
    file: "dist/main.js",
    format: "iife",
    globals: {
      react: "React",
      "react-dom": "ReactDOM"
    }
  }
};
