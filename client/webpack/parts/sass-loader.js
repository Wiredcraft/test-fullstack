module.exports = ({ include, exclude } = {}) => ({
    module: {
        rules: [
            {
                include,
                exclude,
                test: /\.sass$/,
                use: ['style-loader', 'css-loader', 'sass-loader'],
            },
        ],
    },
})
