module.exports = () => ({
    module: {
        rules: [
            {
                test: /\.html$/,
                use: [{
                    loader: 'html-loader',
                    options: {
                        minimize: true,
                        collapseWhitespace: true,
                        conservativeCollapse: false,
                        collapseInlineTagWhitespace: true,
                        removeAttributeQuotes: false,
                        caseSensitive: true,
                        customAttrSurround: [
                          [/#/, /(?:)/],
                          [/\*/, /(?:)/],
                          [/\[?\(?/, /(?:)/],
                        ],
                        customAttrAssign: [/\)?\]?=/],
                    },
                }],
            },
        ],
    },
})
