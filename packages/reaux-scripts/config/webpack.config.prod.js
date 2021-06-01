const createClientWebpackConfig = require("./webpack.config.prod.client");
const createServerWebpackConfig = require("./webpack.config.prod.server");

function createConfig(config) {
    return [createClientWebpackConfig(config), createServerWebpackConfig(config)]
}

module.exports = createConfig;