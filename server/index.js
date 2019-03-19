require("@babel/register")({
  plugins: ["@babel/plugin-transform-modules-commonjs"]
});
require.extensions[".css"] = () => {};

require("./main");
