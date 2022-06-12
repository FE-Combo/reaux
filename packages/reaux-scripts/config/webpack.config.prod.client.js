const path = require("path");
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const WebpackManifestPlugin = require("webpack-manifest-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const reauxConfig = require(path.join(process.cwd(), "/reaux.config.js"));
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");

function createConfig(config) {
    return {
        mode: "production",
        entry: {
            index: config.entry,
        },
        output: {
            path: config.outputPath,
            filename: config.outputFilename,
            publicPath: config.outputPublicPath,
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".scss"],
            modules: [config.baseUrl, "node_modules"],
            alias: {},
            plugins: [
                new TsconfigPathsPlugin({
                    extensions: [".js", ".jsx", ".ts", ".tsx"],
                    configFile: config.clientTSConfig,
                }),
            ],
        },
        optimization: {
            minimizer: [new TerserPlugin({include: /index\.min\.js$/})],
            splitChunks: {chunks: "all"},
            runtimeChunk: {name: "runtime"},
        },
        performance: {
            maxEntrypointSize: 720000,
            maxAssetSize: 1000000,
        },
        module: {
            rules: [
                {
                    test: /(\.tsx|\.ts)$/,
                    exclude: /node_modules/,
                    loader: "ts-loader",
                    options: {
                        configFile: config.clientTSConfig,
                    },
                },
            ],
        },
        plugins: [new HTMLPlugin({template: config.htmlTemplate}), new webpack.DefinePlugin({...(reauxConfig.globalConstant || {})}), new WebpackManifestPlugin({fileName: "manifest.json"}), new webpack.ProgressPlugin()],
    };
}

module.exports = createConfig;
