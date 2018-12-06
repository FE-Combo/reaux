const path = require("path");
// All path must be represented by path. resolve, and string invalid in Win32.

function resolve(relativePath) {
    return path.resolve(__dirname, `../${relativePath}`);
}

module.exports = {
    entry: resolve("src"),
    output: resolve("build/dist"),
    core: resolve("core"),
    static: "static",
    contentBase: resolve("src/static"),
    tsConfig: resolve("config/tsconfig.json"),
    tslintConfig: resolve("config/tslint.json"),
    stylelintConfig: resolve("config/stylelint.json"),
    prettierConfig: resolve("config/prettier.json"),
    port: 3000,
    host: "0.0.0.0",
    alias: {
        co: resolve("src/component"),
        mo: resolve("src/module"),
        m: resolve("mock/"),
    },
    imgLimit: 1024,
    performance: {
        maxEntrypointSize: 720000,
        maxAssetSize: 1000000,
    },
    // buildError: (error, stats) => {},
};
