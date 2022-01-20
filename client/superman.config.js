const path = require('path');

module.exports = {
    port: 9100,
    proxy: {
        '/api/': {
            target: 'https://localhost/',
            secure: false
        }
    },
    resolve: {
        alias: {
          Components: path.resolve(__dirname, 'src/components/'),
          Pages: path.resolve(__dirname, 'src/pages/'),
          Layouts: path.resolve(__dirname, 'src/layouts/'),
        },
      },
}