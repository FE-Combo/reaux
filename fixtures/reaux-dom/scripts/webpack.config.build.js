const path = require("path");
const nodeExternal = require('webpack-node-externals');
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const WebpackManifestPlugin = require('webpack-manifest-plugin');
const TerserPlugin = require("terser-webpack-plugin");
const reauxConfig = require(path.join(process.cwd(), "/reaux.config.js"));

function resolve(relativePath) {
    return path.resolve(__dirname, `../${relativePath}`);
}

module.exports = [{
    mode: "production",
    entry: {
        index: resolve("./src/index.ts"),
    },
    output: {
        path: resolve("./dist/client"),
        filename: "[name].js",
        publicPath: "/client/"
    },
    resolve: {
        extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".scss"],
        modules: [resolve("src"), "node_modules"],
        alias:{
          reaux: resolve( "../../packages/reaux"),
          "reaux-dom": resolve( "../../packages/reaux-dom")
      }
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
          loader: "ts-loader"
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
  },{
    target: 'node',
    node: {
      __dirname: false
    },
    mode:'production',
    entry: {
        index: resolve("./server/index.tsx")
    },
    output: {
        path: resolve("./dist"),
        filename: "server.js",
    },
    resolve:{
      extensions: [".ts", ".tsx", ".js", ".jsx", ".less", ".scss"],
        alias:{
            reaux: resolve( "../../build/reaux/dist"),
            "reaux-dom": resolve( "../../build/reaux-dom/dist")
        }
    },
    externals: [nodeExternal()],
    module: {
        rules: [
            {
                test: /\.(ts|tsx)$/,
                include: [resolve("./server"),resolve("./src")],
                loader: "ts-loader",
            }
        ],
    },
}];
