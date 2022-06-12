const path = require("path");
const fs = require("fs-extra");
const baseConfig = require("./base");
const createDevServerConfig = require("./dev.server");
const createProdServerConfig = require("./prod.server");
const createWebpackDevConfig = require("./webpack.config.dev");
const createWebpackProdConfig = require("./webpack.config.prod");

module.exports = function() {
    const config = {
        baseConfig,
        devServerConfig: createDevServerConfig(baseConfig),
        prodServerConfig: createProdServerConfig(baseConfig),
        webpackDevConfig: createWebpackDevConfig(baseConfig),
        webpackProdConfig: createWebpackProdConfig(baseConfig),
    };
    const configPath = path.join(process.cwd(), "reaux.config.js");
    if (fs.pathExistsSync(configPath)) {
        const customConfig = require(configPath);
        if (customConfig) {
            if (typeof customConfig.baseConfig === "function") {
                config.baseConfig = customConfig.baseConfig(config.baseConfig);
            }
            if (typeof customConfig.devServerConfig === "function") {
                config.devServerConfig = customConfig.devServerConfig(createDevServerConfig(config.baseConfig));
            }
            if (typeof customConfig.prodServerConfig === "function") {
                config.prodServerConfig = customConfig.prodServerConfig(createProdServerConfig(config.baseConfig));
            }
            if (typeof customConfig.webpackDevConfig === "function") {
                config.webpackDevConfig = customConfig.webpackDevConfig(createWebpackDevConfig(config.baseConfig));
            }
            if (typeof customConfig.webpackProdConfig === "function") {
                config.webpackProdConfig = customConfig.webpackProdConfig(createWebpackProdConfig(config.baseConfig));
            }
        }
    }
    return config;
};
