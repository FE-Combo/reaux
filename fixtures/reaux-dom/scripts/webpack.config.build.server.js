const path = require("path");
const nodeExternal = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');

function resolve(relativePath) {
    return path.resolve(__dirname, `../${relativePath}`);
}

module.exports = {
    target: 'node',
    devtool:"cheap-module-source-map",
    entry: {
      index: resolve("./src/server.ts"),
    },
    output: {
      path: resolve("./dist"),
      filename: "[name].js",
      publicPath: "/",
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
        configFile: resolve("config/server.tsconfig.json")
    })]
    },
    externals: [nodeExternal()],
    module: {
      rules: [
        {
          test: /(\.tsx|\.ts)$/,
          exclude: /node_modules/,
          loader: "ts-loader",
          options: {
            configFile: resolve("config/server.tsconfig.json")
          },
        }
      ]
    },
  };


