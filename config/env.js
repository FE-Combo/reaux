const path = require("path");
// All path must be represented by path.resolve, direct use string invalid in Win32.

function resolve(relativePath) {
    return path.resolve(__dirname, `../${relativePath}`);
}

module.exports = {
    /* dev server */
    port: 3000,
    https: true,

    /* webpack */
    src: resolve("src"),
    output: resolve("build/dist"),
    contentBase: resolve("src/static"),
    tsConfig: resolve("config/tsconfig.json"),
    tslintConfig: resolve("config/tslint.json"),
    stylelintConfig: resolve("config/stylelint.json"),
    prettierConfig: resolve("config/prettier.json"),
    ssr: true,
    alias: {
        comp: resolve("src/component"),
        mod: resolve("src/module"),
    },
    imgLimit: 1024,
    performance: {
        maxEntrypointSize: 720000,
        maxAssetSize: 1000000,
    },
    // buildError: (error, stats) => {},

    /* generate icon */
    iconHTMLPath: resolve("src/static/icon.html"),
    iconCssPath: resolve("src/asset/css/icon.less"),
    iconFontFilePath: resolve("src/asset/font"),
    iconComponentPath: resolve("src/components/Icon.tsx"),

    /* generate module */
    targetRootPath: resolve("src/module"), //存放目录
    rootStatePath: resolve("src/type/state.ts"),
};
