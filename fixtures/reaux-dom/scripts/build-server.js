const webpack = require("webpack");
const chalk = require("chalk");
const webpackConfig = require("../config/webpack.config.build.server");
const fs = require("fs-extra")

function build() {
    const compiler = webpack(webpackConfig);
    compiler.run((error, stats) => {
        if (error) {
            console.error(error.stack || error);
            if (error.details) console.error(error.details);
            process.exit(1);
        } else {
            const statsJSON = stats.toJson();
            if (statsJSON.errors.length) {
                console.error(chalk`{red.bold \n${statsJSON.errors.length} Error(s) Occurred:}\n`);
                console.error(chalk`{red.bold ${statsJSON.errors.join("\n\n")}}`);
                process.exit(1);
            }
            console.info(chalk`{white.bold Build successfully}`);
        }
    });

    return;
}

build()