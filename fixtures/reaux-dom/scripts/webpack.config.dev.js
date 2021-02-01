const path = require("path");
const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const reauxConfig = require(path.join(process.cwd(), "/reaux.config.js"));

function resolve(relativePath) {
  return path.resolve(__dirname, `../${relativePath}`);
}

module.exports = {
  mode: "development",
  entry: [
    "webpack-dev-server/client?https://0.0.0.0:8080",
    "webpack/hot/dev-server",
    resolve("./src/index.ts")
  ],
  output: {
    filename: "static/js/[name].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: [resolve("./src"), "node_modules"]
  },
  devtool: "cheap-module-source-map",
  optimization: {
    runtimeChunk: { name: "runtime" },
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
    new HTMLPlugin({template: resolve("./src/index.html")}),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      REAUX_COMPILE_CONFIG: reauxConfig.compileConfig,
      // REAUX_RUNTIME_CONFIG: reauxConfig.runtimeConfig,
    }),
    new webpack.ProgressPlugin(),
  ]
};
