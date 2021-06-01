import webpack from "webpack";
import chalk from "chalk";
import fs from "fs-extra";
const createConfig = require("../../config");

export default () => {
    const config = createConfig();
    const compiler = webpack(config.webpackProdConfig[1]);
    compiler.run((error: any, stats) => {
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
            console.info(chalk`{white.bold Build server successfully}`);
        }
    });

    return;
};
