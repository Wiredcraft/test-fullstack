const { HotModuleReplacementPlugin } = require('webpack');
const { merge } = require('webpack-merge');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const common = require('./webpack.config');

const isHMR = process.env.NODE_HMR;

let plugins = [new HotModuleReplacementPlugin()];
if (isHMR) {
  plugins = [
    ...plugins,
    new BundleAnalyzerPlugin({
      analyzerMode: 'server',
      analyzerHost: 'localhost',
      analyzerPort: 8888,
      openAnalyzer: false,
    }),
  ];
}

const devConfig = merge(common, {
  mode: 'development',
  devtool: 'eval-source-map',
  devServer: {
    host: 'localhost',
    port: 3100,
    open: false,
    hot: true,
    historyApiFallback: true,
    allowedHosts: ['localhost:3100', '127.0.0.1:3100'],
    client: {
      logging: 'info',
      progress: true,
    },
    onListening: function (devServer) {
      if (!devServer) {
        throw new Error('webpack-dev-server is not defined');
      }
      const { address: host, port } = devServer.server.address();
      console.log(`Listening on ${host}:${port}`);
    },
    static: ['assets'],
  },
  plugins,
});

module.exports = devConfig;
