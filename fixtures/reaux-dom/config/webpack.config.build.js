const buildClientWebpackConfig = require("./webpack.config.build.client");
const buildServerWebpackConfig = require("./webpack.config.build.server");

module.exports = [buildClientWebpackConfig,buildServerWebpackConfig];
