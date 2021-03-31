module.exports = {
    test: /\.css$/,
    exclude: "/node_modules",
    use: [
        "cache-loader",
        "style-loader",
        'css-loader',
        {
            loader: 'postcss-loader',
            options: {
                plugins: [
                    require("postcss-import"),
                    require('precss'), // 让css支持类似sass的语法,vscode在设置json中增加 "files.associations": { "*.css": "scss" }
                    require('autoprefixer'),
                    // postcss-preset-env // 允许使用新特性，类似babel
                ]
            }
        }
    ]
    // use: [{
    //         loader: "style-loader"
    //     },
    //     {
    //         loader: "css-loader",
    //         options: {
    //             importLoaders: 1,
    //         }
    //     },
    //     {
    //         loader: 'postcss-loader'
    //     }
    // ]
}