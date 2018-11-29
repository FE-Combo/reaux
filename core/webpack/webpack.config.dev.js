const path = require("path");
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ForkTSCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const TSImportPlugin = require("ts-import-plugin");
const chalk = require("chalk");
const DevServer = require("webpack-dev-server");

const webpackConfig = env => ({
    mode: "development", // development or production
    entry: [`webpack-dev-server/client?https://0.0.0.0:${env.port}`, "webpack/hot/dev-server", `${env.demo ? env.demo : env.src}/index.tsx`], // 需要打包文件"./src/index.tsx" 默认文件名为 main (公共js,如 react),"webpack-dev-server/client?https://0.0.0.0:3000"为按需加载js模块
    output: {
        path: env.dist, // production 输出目录前缀
        filename: "static/js/[name].js", // development、production 输出文件
        publicPath: "/", // development 输入目录前缀
    },
    devtool: "cheap-module-source-map",
    optimization: {
        splitChunks: {
            chunks: "async",
            automaticNameDelimiter: "-",
        },
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".sass", ".less"], // require、import时这些后缀不需要添加
        modules: [env.demo ? env.demo : env.src, "node_modules"], // 导入文件默认在src、node_modules下查找
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
                include: env.demo ? [env.src, env.core, env.demo] : [env.src],
                loader: "ts-loader",
                exclude: /node_modules/,
                options: {
                    getCustomTransformers: () => ({
                        before: [TSImportPlugin({libraryName: "antd", libraryDirectory: "es", style: true})],
                    }),
                },
            },
            {
                test: /\.(css|less)$/,
                use: [
                    "style-loader",
                    "css-loader",
                    {
                        loader: "less-loader",
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif)$/,
                loader: "url-loader",
                query: {
                    limit: 1024,
                    name: "static/img/[name].[hash:8].[ext]",
                },
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                loader: "file-loader",
                options: {
                    name: "static/font/[name].[hash:8].[ext]",
                },
            },
        ],
    },
    plugins: [
        new StylelintPlugin({
            configFile: env.stylelintConfig,
            context: env.demo ? env.demo : env.src,
            files: "**/*.less",
            syntax: "less",
        }),
        new ForkTSCheckerPlugin({
            tsconfig: env.tsConfig,
            tslint: env.tslintConfig,
            workers: ForkTSCheckerPlugin.TWO_CPUS_FREE,
        }),
        new HTMLPlugin({
            template: path.resolve(__dirname, `${env.demo ? env.demo : env.src}/index.html`), // 自动在该模板中导入 output 中的filename文件
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin(), // 控制台显示加载进度
    ],
});

const devServer = (compiler, env) => {
    return new DevServer(compiler, {
        contentBase: env.static, // 静态资源目录
        watchContentBase: true, // contentBase目录下变更数据时自动刷新
        host: env.host, // 使用localhost会导致报错 [WDS] Disconnected!
        https: true, // 必须使用https访问
        historyApiFallback: true, // 所有路由不经过服务端,用于SPA单页应用
        hot: true,
        compress: true,
        overlay: {
            warnings: true,
            errors: true,
        },
    });
};

module.exports = start = env => {
    const config = webpackConfig(env);
    const compiler = webpack(config);
    const server = devServer(compiler, env);
    server.listen(env.port, env.host, error => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        console.info(chalk`starting dev server on {green https://localhost:${env.port}/} \n`);
        return null;
    });
};
