const autoprefixer = require('autoprefixer')

module.exports = () => ({
    loader: 'postcss-loader',
    options: {
        plugins: () => ([autoprefixer()]),
    },
})
