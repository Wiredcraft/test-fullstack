module.exports = {
    test: /\.(png|jpg|jpeg|gif)$/,
    use: [{
        loader: 'url-loader',
        options: {
            name: '[name].[ext]',
            outputPath: 'assets/img/', //输出到 images 文件夹
            limit: 10240 //把小于 20kb 的文件转成 Base64 的格式
        }
    }]
}