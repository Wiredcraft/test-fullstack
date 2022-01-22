const path = require('path');

module.exports = {
    port: 9100,
    proxy: {
        '/api/': {
            target: 'http://localhost:7001/',
            secure: false
        }
    },
    resolve: {
        alias: {
          Assets: path.resolve(__dirname, 'src/assets/'),
          Components: path.resolve(__dirname, 'src/components/'),
          Pages: path.resolve(__dirname, 'src/pages/'),
          Layouts: path.resolve(__dirname, 'src/layouts/'),
          Utils: path.resolve(__dirname, 'src/utils/'),
        },
      },
}