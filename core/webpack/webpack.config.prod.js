const path = require("path");
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ForkTSCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const env = require("../../config/env");

const clientConfig = {
    mode: "development",
    target: "web",
    entry: ["./core/webpack/entry-client.tsx"],
    output: {
        pathinfo: true, // 输入代码添加额外的路径注释，提高代码可读性
        filename: `${env.static}/client/js/[name].js` /* development、production 输出文件 */,
        publicPath: "/" /* development 输入目录前缀 */,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".sass", ".less"] /* require、import时这些后缀不需要添加 */,
        modules: [env.entry, "node_modules"] /* 导入文件默认在src、node_modules下查找 */,
        alias: env.alias,
    },
    devtool: "cheap-module-source-map",
    optimization: {
        runtimeChunk: "single",
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"],
                },
            },
            {
                test: /\.(ts|tsx)$/,
                include: env.core ? [env.entry, env.core] : [env.entry],
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(css|less)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true /* Inline-javascript, enabled can use Mixins */,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                loader: "url-loader",
                query: {
                    limit: env.imgLimit || 1024 /* Generate separate images beyond limit otherwise use picture stream format. */,
                    name: `${env.static}/img/[name].[hash:8].[ext]`,
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    name: `${env.static}/font/[name].[hash:8].[ext]`,
                },
            },
            {
                test: /\.mp4$/,
                loader: "file-loader",
            },
        ],
    },
    plugins: [
        new StylelintPlugin({
            configFile: env.stylelintConfig,
            context: env.entry,
            files: "**/*.less",
            syntax: "less",
        }),
        new ForkTSCheckerPlugin({
            tsconfig: env.tsConfig,
            tslint: env.tslintConfig,
            workers: ForkTSCheckerPlugin.TWO_CPUS_FREE,
        }),
        new HTMLPlugin({
            template: path.resolve(__dirname, `${env.entry}/index.html`) /* 自动在该模板中导入 output 中的filename文件 */,
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin() /* 控制台显示加载进度 */,
    ],
};

const serverConfig = {
    mode: "production",
    target: "node",
    bail: true,
    devtool: false,
    entry: ["./core/webpack/entry-server.tsx"],
    output: {
        chunkFilename: `${env.static}/js/[name].chunk.js`,
        filename: `${env.static}/server/js/[name].js` /* development、production 输出文件 */,
        publicPath: "/" /* development 输入目录前缀 */,
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".json"],
        modules: [env.entry, "node_modules"],
    },
    optimization: {
        minimize: false,
        splitChunks: {
            cacheGroups: {
                default: false,
                vendors: {
                    minChunks: 1,
                    minSize: 0,
                    name: "vendors",
                },
            },
        },
        runtimeChunk: false,
    },
    module: {
        rules: [
            {
                test: /(\.jsx|\.js)$/,
                exclude: /node_modules/,
                loader: "babel-loader",
                query: {
                    presets: ["es2015", "react"],
                },
            },
            {
                test: /\.(ts|tsx)$/,
                include: env.core ? [env.entry, env.core] : [env.entry],
                loader: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(css|less)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                        options: {
                            javascriptEnabled: true /* Inline-javascript, enabled can use Mixins */,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                loader: "url-loader",
                query: {
                    limit: env.imgLimit || 1024 /* Generate separate images beyond limit otherwise use picture stream format. */,
                    name: `${env.static}/img/[name].[hash:8].[ext]`,
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    name: `${env.static}/font/[name].[hash:8].[ext]`,
                },
            },
            {
                test: /\.mp4$/,
                loader: "file-loader",
            },
        ],
    },
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/), new webpack.ProgressPlugin()],
};

module.exports = [clientConfig, serverConfig];
