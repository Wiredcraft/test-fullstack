const path = require('path');

module.exports = {
  mode: 'production',
  entry: ['./lib/polyfill.js', './lib/index.js'],
  output: {
    library: 'angela',
    libraryTarget: 'umd',
    libraryExport: 'default',
    filename: 'angela.umd.js',
    path: path.resolve(__dirname, 'build')
  },
};