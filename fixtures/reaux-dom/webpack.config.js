const webpack = require("webpack");
const HTMLPlugin = require("html-webpack-plugin");
const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');
const ReactRefreshTypeScript = require('react-refresh-typescript');

const config = {
  mode: "development",
  entry: "./src/index.ts",
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
        loader: "ts-loader",
        options: {
          getCustomTransformers: () => ({
            before: [ReactRefreshTypeScript()],
          }),
          transpileOnly: true,
        },
      }
    ]
  },
  plugins: [
    new HTMLPlugin({
      template: `./src/index.html`
    }),
    new ReactRefreshWebpackPlugin(),
    new webpack.ProgressPlugin()
  ]
};

module.exports = config;
