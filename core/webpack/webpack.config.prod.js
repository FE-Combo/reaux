const path = require("path");
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const StylelintPlugin = require("stylelint-webpack-plugin");
const ForkTSCheckerPlugin = require("fork-ts-checker-webpack-plugin");
const TSImportPlugin = require("ts-import-plugin");
const chalk = require("chalk");
const DevServer = require("webpack-dev-server");

const webpackConfig = env => ({
    mode: "development",
    entry: [`${env.entry}/index.tsx`],
    output: {
        path: env.dist,
        filename: `${env.static}`,
        publicPath: "/",
    },
    devtool: "cheap-module-source-map",
    optimization: {
        splitChunks: {
            chunks: "async",
            automaticNameDelimiter: "-",
        },
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".sass", ".less"],
        modules: [env.entry, "node_modules"],
        alias: env.alias,
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
                            javascriptEnabled: true,
                        },
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|webp)$/,
                loader: "url-loader",
                query: {
                    limit: env.imgLimit || 1024,
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
            template: path.resolve(__dirname, `${env.entry}/index.html`),
        }),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.ProgressPlugin(),
    ],
});

const devServer = (compiler, env) => {
    return new DevServer(compiler, {
        contentBase: env.contentBase,
        watchContentBase: true,
        host: env.host,
        https: true,
        historyApiFallback: false,
        hot: true,
        compress: true,
        overlay: {
            warnings: true,
            errors: true,
        },
    });

    ["SIGINT", "SIGTERM"].forEach(signal => {
        process.on(signal, () => {
            server.close();
            process.exit();
        });
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
