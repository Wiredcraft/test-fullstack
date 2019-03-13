import css from "rollup-plugin-css-only";
import babel from "rollup-plugin-babel";
import replace from "rollup-plugin-replace";

export default {
  external: ["react", "react-dom"],
  input: "src/main.js",
  plugins: [
    css({ output: "dist/main.css" }),
    babel({
      plugins: [
        "@babel/plugin-transform-react-jsx",
        ["@babel/plugin-proposal-object-rest-spread", { useBuiltIns: true }]
      ]
    }),
    replace({
      "process.env.NODE_ENV": JSON.stringify(process.env.NODE_ENV)
    })
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
