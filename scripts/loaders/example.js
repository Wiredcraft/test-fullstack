let fontLoader = {
    test: path.resolve(__dirname, "font"),
    use: [{
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: 'font/', // 图片输出
            publicPath: "../font" // 发布路径,css中设置的路径，html、js也会?
        }
    }]
};

let cssLoader = {
    test: path.resolve(__dirname, "css"),
    //test: /\.css$/,
    use: [
        MiniCssExtractPlugin.loader,
        "css-loader"
        // loader: "style-loader!css-loader"
    ]
};

let styleLoader = {
    test: /\.css$/,
    loader: "style-loader!css-loader"
}

let happyLoader = {
    test: /(\.tsx?$)|(\.js$)/,
    include: path.resolve(__dirname, "src"),
    loader: 'happypack/loader?id=ts',
}

let imgLoader = {
    test: /\.(png)|(jpg)$/,
    use: [{
        loader: 'file-loader',
        options: {
            name: '[name].[ext]',
            outputPath: 'img/', // 图片输出
            publicPath: "../img" // 发布路径,css中设置的路径，html、js也会?
        }
    }]
};

let typeScriptLoader = {
    test: /(\.tsx?$)|(\.js$)/,
    include: path.resolve(__dirname, "src"),
    loader: "awesome-typescript-loader",
    /*options: {
        // disable type checker - we will use it in fork plugin
        transpileOnly: true 
    }*/
};

let sourceMapLoader = {
    enforce: "pre",
    test: /\.js$/,

    include: path.resolve(__dirname, "css"),
    loader: "source-map-loader"
};

let tsLoader = {
    test: /(\.tsx?$)|(\.js$)/,
    include: path.resolve(__dirname, "src"),
    // loader: 'happypack/loader?id=ts',
    loader: "ts-loader",
    // options: {
    //     // disable type checker - we will use it in fork plugin
    //     transpileOnly: true
    // }
}