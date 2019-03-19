module.exports = api => {
  if (api.env(["server", "test"])) {
    return {
      plugins: [
        "@babel/plugin-transform-modules-commonjs",
        "@babel/plugin-transform-react-jsx"
      ]
    };
  }

  return {
    plugins: [
      "@babel/plugin-transform-react-jsx",
      ["@babel/plugin-proposal-object-rest-spread", { useBuiltIns: true }]
    ]
  };
};
