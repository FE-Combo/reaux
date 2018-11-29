const path = require("path");

function resolve(relativePath) {
    return path.resolve(__dirname, `../${relativePath}`);
}

module.exports = {
    dist: resolve("build/dist"),
    src: resolve("src"),
    core: resolve("core"),
    demo: resolve("demo"),
    static: resolve("static"),
    lib: resolve("lib"),
    conf: resolve("src/conf"),
    tsConfig: resolve("config/tsconfig.json"),
    tslintConfig: resolve("config/tslint.json"),
    stylelintConfig: resolve("config/stylelint.json"),
    port: 3000,
    host: "0.0.0.0",
};
