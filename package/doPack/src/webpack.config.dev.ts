import path from "path";
import webpack from "webpack";
import HTMLPlugin from "html-webpack-plugin";
import StylelintPlugin from "stylelint-webpack-plugin";
import ForkTSCheckerPlugin from "fork-ts-checker-webpack-plugin";
import TSImportPlugin from "ts-import-plugin";
import chalk from "chalk";
import DevServer from "webpack-dev-server";

function webpackConfig(env: any): webpack.Configuration[] {
    return [
        {
            mode: "development" /* development or production */,
            entry: [`webpack-dev-server/client?https://0.0.0.0:${env.port}`, "webpack/hot/dev-server", `${env.src}/index.tsx`] /* 需要打包文件"./src/index.tsx" 默认文件名为 main (公共js,如 react),"webpack-dev-server/client?https://0.0.0.0:3000"为按需加载js模块 */,
            output: {
                path: env.dist /* production 输出目录前缀 */,
                filename: `static/js/[name].js` /* development、production 输出文件 */,
                publicPath: "/" /* development 输入目录前缀 */,
            },
            devtool: "cheap-module-source-map",
            optimization: {
                splitChunks: {
                    chunks: "async",
                    automaticNameDelimiter: "-",
                },
            },
            resolve: {
                extensions: [".ts", ".tsx", ".js", ".jsx", ".sass", ".less"] /* require、import时这些后缀不需要添加 */,
                modules: [env.src, "node_modules"] /* 导入文件默认在src、node_modules下查找 */,
                alias: env.alias,
            },
            module: {
                rules: [
                    {
                        test: /\.(ts|tsx)$/,
                        include: [env.src],
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
                            name: `static/img/[name].[hash:8].[ext]`,
                        },
                    },
                    {
                        test: /\.(woff|woff2|eot|ttf|otf)$/,
                        loader: "file-loader",
                        options: {
                            name: `static/font/[name].[hash:8].[ext]`,
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
                    context: env.src,
                    files: ["**/*.less"],
                    syntax: "less",
                }),
                new ForkTSCheckerPlugin({
                    tsconfig: env.tsConfig,
                    tslint: env.tslintConfig,
                    workers: ForkTSCheckerPlugin.TWO_CPUS_FREE,
                }),
                new HTMLPlugin({
                    template: path.resolve(__dirname, `${env.src}/index.html`) /* 自动在该模板中导入 output 中的filename文件 */,
                }),
                new webpack.HotModuleReplacementPlugin(),
                new webpack.ProgressPlugin() /* 控制台显示加载进度 */,
            ],
        },
    ];
}

function devServer(compiler: webpack.Compiler | webpack.MultiCompiler, env: any): DevServer {
    return new DevServer(compiler, {
        contentBase: env.contentBase /* 静态资源目录 */,
        watchContentBase: true /* contentBase目录下变更数据时自动刷新 */,
        host: "0.0.0.0" /* 使用localhost会导致报错 [WDS] Disconnected! */,
        https: env.https /* 必须使用https访问 */,
        historyApiFallback: true /* 所有路由不经过服务端,用于SPA单页应用 */,
        disableHostCheck: true,
        hot: true,
        compress: true,
        overlay: {
            warnings: true,
            errors: true,
        },
    });
}

function start(env: any): void {
    const config: webpack.Configuration[] = webpackConfig(env);
    const compiler = webpack(config);
    const server = devServer(compiler, env);
    server.listen(env.port, "0.0.0.0", (error: any) => {
        if (error) {
            console.error(error);
            process.exit(1);
        }
        console.info(chalk`starting dev server on {green ${env.https ? "https" : "http"}://localhost:${env.port}/} \n`);
        return null;
    });

    /* [中断进程, 软件终止信号]监听 ref：https://blog.csdn.net/sufwei/article/details/51610676 */
    ["SIGINT", "SIGTERM"].forEach(signal => {
        process.on(signal as any, () => {
            server.close();
            process.exit();
        });
    });

    return;
}
export default start;
