import webpack from "webpack";
import autoprefixer from "autoprefixer";
import MiniCSSExtractPlugin from "mini-css-extract-plugin";
import ForkTSCheckerPlugin from "fork-ts-checker-webpack-plugin";
import HTMLPlugin from "html-webpack-plugin";
import UglifyJSPlugin from "uglifyjs-webpack-plugin";
import StylelintPlugin from "stylelint-webpack-plugin";
import TSImportPlugin from "ts-import-plugin";
import OptimizeCSSAssetsPlugin from "optimize-css-assets-webpack-plugin";
import chalk from "chalk";
import childProcess from "child_process";
import fs from "fs-extra";

function webpackConfig(env: any): webpack.Configuration[] {
    return [
        {
            mode: "production",
            entry: `${env.src}/index.tsx`,
            output: {
                path: env.output,
                filename: `static/js/[name].[chunkhash:8].js`,
            },
            resolve: {
                extensions: [".ts", ".tsx", ".js", ".jsx", ".less"],
                modules: [env.src, "node_modules"],
            },
            devtool: "nosources-source-map",
            bail: true,
            optimization: {
                namedModules: true,
                runtimeChunk: "single",
                splitChunks: {
                    automaticNameDelimiter: "-",
                    maxAsyncRequests: 12,
                },
                minimizer: [
                    new UglifyJSPlugin({
                        cache: true,
                        parallel: true,
                        sourceMap: true,
                        uglifyOptions: {
                            compress: {
                                pure_funcs: ["console.info", "console.debug", "console.time", "console.timeEnd"],
                            },
                        },
                    }),
                    new OptimizeCSSAssetsPlugin({
                        cssProcessorOptions: {
                            map: {
                                inline: false,
                            },
                        },
                    }),
                ],
            },
            performance: env.performance || {
                maxEntrypointSize: 720000 /* 实际大小700kb（单位换算后），module大小包含 html/css/js/图片流，不包括独立生成的图片，导入的异步模块会单独生成一个新的module（ import() ） */,
                maxAssetSize: 1000000,
            },
            module: {
                rules: [
                    {
                        test: /\.(ts|tsx)$/,
                        include: [env.src],
                        loader: "ts-loader",
                        options: {
                            configFile: env.tsConfig,
                            transpileOnly: true,
                            getCustomTransformers: () => ({
                                before: [TSImportPlugin({libraryName: "antd", libraryDirectory: "es", style: true})],
                            }),
                        },
                    },
                    {
                        test: /\.(css|less)$/,
                        use: [
                            MiniCSSExtractPlugin.loader,
                            {
                                loader: "css-loader",
                                options: {
                                    sourceMap: true,
                                    importLoaders: 2,
                                },
                            },
                            {
                                loader: "postcss-loader",
                                options: {
                                    sourceMap: true,
                                    plugins: () => [autoprefixer],
                                },
                            },
                            {
                                loader: "less-loader",
                                options: {
                                    javascriptEnabled: true,
                                    sourceMap: true,
                                },
                            },
                        ],
                    },
                    {
                        test: /\.(png|jpe?g|gif|webp)$/,
                        loader: "url-loader",
                        query: {
                            limit: env.imgLimit || 1024,
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
                        options: {
                            name: `static/mp4/[name].[hash:8].[ext]`,
                        },
                    },
                ],
            },
            plugins: [
                new MiniCSSExtractPlugin({
                    filename: `static/css/[name].[contenthash:8].css`,
                }),
                new ForkTSCheckerPlugin({
                    tsconfig: env.tsConfig,
                    tslint: env.tslintConfig,
                    workers: ForkTSCheckerPlugin.TWO_CPUS_FREE,
                }),
                new StylelintPlugin({
                    configFile: env.stylelintConfig,
                    context: env.src,
                    files: ["**/*.less"],
                    syntax: "less",
                }),
                new HTMLPlugin({
                    template: `${env.src}/index.html`,
                    minify: {
                        collapseBooleanAttributes: true,
                        collapseInlineTagWhitespace: true,
                        collapseWhitespace: true,
                        includeAutoGeneratedTags: false,
                        keepClosingSlash: true,
                        minifyCSS: true,
                        minifyJS: true,
                        minifyURLs: true,
                        removeAttributeQuotes: true,
                        removeComments: true,
                        removeEmptyAttributes: true,
                        removeRedundantAttributes: true,
                        removeScriptTypeAttributes: true,
                        removeStyleLinkTypeAttributes: true,
                        removeTagWhitespace: true,
                        useShortDoctype: true,
                    },
                }),
                new webpack.ProgressPlugin(),
            ],
        },
    ];
}

function spawn(command: string, params: string[], errorMessage: string): void {
    const isWindows = process.platform === "win32"; /* spawn with {shell: true} can solve .cmd resolving, but prettier doesn't run correctly on mac/linux */
    const result = childProcess.spawnSync(isWindows ? command + ".cmd" : command, params, {stdio: "inherit"});
    if (result.error) {
        console.error(result.error);
        process.exit(1);
    }
    if (result.status !== 0) {
        console.error(chalk`{red.bold ${errorMessage}}`);
        console.error(`non-zero exit code returned, code=${result.status}, command=${command} ${params.join(" ")}`);
        process.exit(1);
    }
}

function build(env: any): void {
    /* clear console */
    process.stdout.write(process.platform === "win32" ? "\x1B[2J\x1B[0f" : "\x1B[2J\x1B[3J\x1B[H");
    console.info(chalk`{green.bold [task]} {white.bold check code style}`);
    spawn("prettier", ["--config", `${env.prettierConfig}`, "--list-different", `{${env.src},test}/**/*.{ts,tsx,less}`], "check code style failed, please format above files");

    console.info(chalk`{green.bold [task]} {white.bold cleanup ${env.output}}`);
    fs.emptyDirSync(env.output);

    console.info(chalk`{green.bold [task]} {white.bold copy ${env.contentBase} folder to ${env.output}}`);
    fs.copySync(env.contentBase, env.output, {dereference: true});

    console.info(chalk`{green.bold [task]} {white.bold webpack}`);
    const config = webpackConfig(env);
    const compiler = webpack(config);
    compiler.run((error: any, stats: any) => {
        if (env.buildError) {
            env.buildError(error, stats);
            return;
        }
        if (error) {
            console.error(error.stack || error);
            if (error.details) {
                console.error(error.details);
            }
            process.exit(1);
        } else {
            const statsJSON = stats.toJson();
            if (env.profile) {
                console.info(chalk`{green.bold [task]} write stats.json`);
                fs.writeFileSync("stats.json", JSON.stringify(statsJSON, null, 2));
            }

            if (statsJSON.errors.length) {
                console.error(chalk`{red.bold \n${statsJSON.errors.length} Error(s) Occurred:}\n`);
                console.error(chalk`{red.bold ${statsJSON.errors.join("\n\n")}}`);
                process.exit(1);
            } else if (statsJSON.warnings.length) {
                /* Ignore "Conflicting order between" warning, produced by "mini-css-extract-plugin" */
                const warnings = statsJSON.warnings.filter((_: any) => _.indexOf("[mini-css-extract-plugin]\nConflicting order between") < 0);
                if (warnings.length > 0) {
                    console.error(chalk`{red.bold \n${warnings.length} Warning(s) Occurred:}\n`);
                    console.error(chalk`{red.bold ${warnings.join("\n\n")}}`);
                    process.exit(1);
                }
            }

            console.info(chalk`{white.bold Build successfully}`);
        }
    });

    return;
}

export default build;
