const path = require('path');

module.exports = {
    module: {
        loaders: [
            {
                test: /\.less$/, loader: "style-loader!css-loader?modules!less",
                include: path.resolve(__dirname, '../')
            },
            {
                test: /\.css$/, loader: "style-loader!css-loader?modules",
                include: path.resolve(__dirname, '../')
            },
            {
                test: /\.css$/, loader: "style-loader!css-loader?",
                include: path.resolve(__dirname, '../')
            },
            {test: /\.png|\.jpg/, loader: "file-loader"}
        ]
    }
};
