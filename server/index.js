require("@babel/register")({
  plugins: [
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-transform-modules-commonjs"
  ]
});
require.extensions[".css"] = () => {};

require("./main");
