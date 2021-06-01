const fs = require("fs-extra")
const build = require("../../../build/reaux-scripts/dist/src/commandActions/build.js")

fs.emptyDirSync("dist");

build.default();
