const path = require("path");
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const reauxConfig = require(path.join(process.cwd(), "/reaux.config.js"));
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

function resolve(relativePath) {
    return path.resolve(__dirname, `../${relativePath}`);
}

module.exports = {
    mode: "production",
    entry: {
        index: resolve("./src/index.ts"),
    },
    output: {
        path: resolve("./dist/client"),
        filename: "[name].js",
        publicPath: "/client/",
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".scss"],
        modules: [resolve("src"), "node_modules"],
        alias:{
          reaux: resolve( "../../packages/reaux"),
          "reaux-dom": resolve( "../../packages/reaux-dom")
        },
        plugins:[new TsconfigPathsPlugin({
            extensions: [".js", ".jsx",".ts", ".tsx"],
            configFile: resolve("config/client.tsconfig.json") 
        })]
    },
    optimization: {
        minimizer: [new TerserPlugin({include: /index\.min\.js$/})],
        splitChunks: { chunks: "all" },
        runtimeChunk: { name: "runtime" },
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
            configFile: resolve("config/client.tsconfig.json")
          },
        }
      ]
    },
    plugins: [
        new HTMLPlugin({template: `./src/index.html`}),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            REAUX_COMPILE_CONFIG: reauxConfig.compileConfig,
            // REAUX_RUNTIME_CONFIG: reauxConfig.runtimeConfig,
        }),
        new WebpackManifestPlugin({fileName: 'manifest.json'}),
        new webpack.ProgressPlugin(),
    ],
  };
