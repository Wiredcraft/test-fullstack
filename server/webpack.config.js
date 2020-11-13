const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin'); // clean the /dist folder before each build
const nodeExternals = require('webpack-node-externals'); // retrieve external dependencies at runtime rather than build in bundle.

const prod = process.env.NODE_ENV === "production";

const devtool = prod ? "source-map" : "inline-source-map";
const mode = prod ? "production" : "development";

module.exports = {
    mode,
    target: "node",
    devtool,
    entry: [path.join(__dirname, "src/index.ts")],
    module: {
        rules: [
            {
                exclude: [path.resolve(__dirname, "node_modules")],
                test: /\.ts$/,
                use: ["babel-loader"]
            },
            {
                test: /\.(gql|graphql)$/i,
                use: [
                    {
                        loader: "raw-loader",
                        options: {
                            esModule: false,
                        },
                    },
                ],
            }
        ]
    },
    output: {
        filename: "server.js",
        path: path.resolve(__dirname, "./dist")
    },
    resolve: {
        extensions: [".ts", ".js", ".gql", ".graphql"]
    },
    externals: [nodeExternals({})],
    plugins: [new CleanWebpackPlugin()],
};
