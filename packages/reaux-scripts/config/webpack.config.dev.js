const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");

function createConfig (config) {
    return {
        mode: "development",
        entry: [`webpack-dev-server/client?https://0.0.0.0:${config.port}`, "webpack/hot/dev-server", config.entry],
        output: {
            filename: "static/js/[name].js",
            publicPath: "/",
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".less",".scss"],
            modules: [config.baseUrl, "node_modules"],
        },
        devtool: "cheap-module-source-map",
        module: {rules:[{
            test: /(\.tsx|\.ts)$/,
            exclude: /node_modules/,
            use: ["ts-loader"],
        }]},
        plugins: [
            new HTMLPlugin({ template: config.htmlTemplate }),
            new webpack.DefinePlugin({...(config.globalConstant||{})}),
            new webpack.HotModuleReplacementPlugin(),
            new webpack.ProgressPlugin(),
        ],
    }
}

module.exports = createConfig;