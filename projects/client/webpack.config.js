const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const NodePolyfillPlugin = require("node-polyfill-webpack-plugin")

//get node environment variable in root folder
require("dotenv").config({
  path: path.resolve(process.cwd(), `../../.env.${process.env.NODE_ENV}`),
});

const isDevelopment = process.env.NODE_ENV !== "production";

module.exports = {
  mode: isDevelopment ? "development" : "production",
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.[jt]sx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: require.resolve("ts-loader"),
          },
        ],
      },
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(png|jpe?g|gif)$/i,
        use: [
          {
            loader: 'file-loader'
          }
        ]
      }
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
    alias: {
      components: path.resolve(__dirname, "src/components"),
    },
    plugins: [new TsconfigPathsPlugin()],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    static: "./dist",
    historyApiFallback: true,
    hot: true,
    port: process.env.CLIENT_PORT,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new webpack.ProvidePlugin({
      process: "process/browser",
    }),
    new webpack.EnvironmentPlugin([
      "NODE_ENV",
      "SERVER_PROTOCOL",
      "SERVER_HOST",
      "SERVER_PORT",
    ]),
    new NodePolyfillPlugin()
  ],
};
