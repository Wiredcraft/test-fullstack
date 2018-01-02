const FaviconsWebpackPlugin = require('favicons-webpack-plugin')

module.exports = (favicon) => ({
    plugins: [
        new FaviconsWebpackPlugin(favicon),
    ],
})
