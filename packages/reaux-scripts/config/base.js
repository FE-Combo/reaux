const path = require("path");
const fs = require("fs-extra");
const customHtmlTemplatePath = path.join(process.cwd(),"src/index.html");
const tsConfig = path.join(process.cwd(),"tsconfig.json");

const config = {
    port:8080,
    baseUrl:path.join(process.cwd(),"src"),

    entry:path.join(process.cwd(),"src/index.ts"),
    serverEntry: path.join(process.cwd(),"src/server.ts"),

    outputPath: path.join(process.cwd(),"dist/"),
    outputFilename: "[name].js",
    outputPublicPath: "/",
    serverOutputPath: path.join(process.cwd(),"dist/"),
    serverOutputFilename: "[name].js",
    serverOutputPublicPath: "/",

    contentBase: path.join(process.cwd(),"src/statics"),
    htmlTemplate:fs.pathExistsSync(customHtmlTemplatePath) ? customHtmlTemplatePath : path.resolve(__dirname,"../src/index.html"),
    globalConstant: {},

    clientTSConfig:tsConfig,
    serverTSConfig:tsConfig,
}

module.exports = config;