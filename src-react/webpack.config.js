
const HtmlWebPackPlugin = require("html-webpack-plugin");
const path = require('path');
const PATH = path.resolve(__dirname, 'js');

module.exports = {
  entry:{
    "index":path.resolve(__dirname,"index.js"),
  },
  output:{
      publicPath: '/',
      path:path.resolve(__dirname,"dist"),
      filename:"[name].js"
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader"
        }
      },
      {
        test: /\.css$/,
        use: [
             {
                 loader: 'style-loader'  // 可以把css放在页面上
             },
             {
                 loader: 'css-loader'    // 放在后面的先被解析
             }
        ]
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader"
          }
        ]
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css', '.json', '.html'],
    alias: {
      store: `${PATH}/store`,
      '@constants': `${PATH}/constant`,
      '@pages': `${PATH}/pages`,
      '@components': `${PATH}/components`,
    }
  },
  devServer: {
    historyApiFallback: true
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: "./index.html",
      filename: "./index.html"
    })
  ]
};