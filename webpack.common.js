const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const cssRegex = /\.css$/;
const cssModuleRegex = /\.module\.css$/;

module.exports = () => {
  return {
    mode: "development",
    entry: {
      index: './src/index.js'
    },
    output: {
      path: path.resolve(__dirname, "dist/"),
    },
    plugins: [
      new HtmlWebpackPlugin({
        filename: "index.html",
        template: "./build/index.html",
      }),
    ],
    module: {
      rules: [
        {
          test: /\.(jsx|js)?$/,
          use: ["babel-loader"],
          include: path.resolve(__dirname, 'src')
        },
        {
          test: cssRegex,
          exclude: cssModuleRegex,
          use: ["style-loader", "css-loader", "postcss-loader"]
        },
      ]
    },
  }
}
