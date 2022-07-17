const path = require("path")
const HtmlWebpackPlugin = require("html-webpack-plugin")

module.exports = {
  entry: {
    bundle: path.resolve(__dirname, "src/index.js"),
  },
  mode: "development",
  devtool: "source-map",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "[name][contenthash].js",
    clean: true,
    assetModuleFilename: "[name][ext]",
  },
  devServer: {
    static: {
      directory: path.resolve(__dirname, "build"),
    },
    port: 3000,
    open: false,
    hot: true,
    compress: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(css|scss)$/,
        use: [
          "style-loader",
          {
            loader: "css-loader",
            options: {
              modules: true,
              importLoaders: 1,
              localIdentName: "[name]__[local]__[hash:base64:5]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "index.html",
      template: "public/index.html",
    }),
  ],
  performance: {
    maxAssetSize: 300000,
    maxEntrypointSize: 400000,
  },
}
