const webpack = require("webpack");

const HTMLPlugin = require("html-webpack-plugin");

const config = {
  mode: "development",
  entry: [
    "webpack-dev-server/client?https://0.0.0.0:3000",
    "webpack/hot/dev-server",
    `./src/index.ts`
  ],
  output: {
    filename: "static/js/[name].js",
    publicPath: "/"
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".jsx"],
    modules: ["./src", "node_modules"]
  },
  devtool: "cheap-module-source-map",
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
    new HTMLPlugin({
      template: `./src/index.html`
    }),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.ProgressPlugin()
  ]
};

module.exports = config;
