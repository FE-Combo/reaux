const chalk = require("chalk");
const fs = require("fs-extra");
const path = require("path");
const yargs = require("yargs");

let targetRootPath;
let rootStatePath;
let available1stLevelModuleNames;

function getModuleName(moduleNameInArg) {
    // E.g:
    //  account/order-detail -> accountOrderDetail
    //  common/something -> something
    const replaceHyphen = (name, alwaysPascal = false) => {
        return name
            .split("-")
            .map((_, index) => (alwaysPascal || index > 0 ? _.substr(0, 1).toUpperCase() + _.slice(1) : _))
            .join("");
    };

    const moduleName = moduleNameInArg.split("/")[0];
    const subModuleName = moduleNameInArg.split("/")[1];
    if (moduleName === "common") {
        return replaceHyphen(subModuleName);
    } else {
        return moduleName + replaceHyphen(subModuleName, true);
    }
}

function getModulePascalName(moduleNameInArg, suffix) {
    // E.g (suffix=State):
    //  account/order-detail -> AccountOrderDetailState
    //  common/something -> SomethingState
    const moduleFullName = getModuleName(moduleNameInArg);
    return moduleFullName.charAt(0).toUpperCase() + moduleFullName.slice(1) + suffix;
}

function createModuleFolder(moduleNameInArg) {
    // Copy sources to target
    const moduleName = moduleNameInArg.split("/")[0];
    const subModuleName = moduleNameInArg.split("/")[1];
    const sourcePath = path.resolve(__dirname, "./boilerplate");
    const targetPath = `${targetRootPath}/${moduleName}/${subModuleName}`;
    fs.copySync(sourcePath, targetPath);

    // Replace placeholders
    const moduleFullName = getModuleName(moduleNameInArg);
    const moduleMainComponentName = getModulePascalName(moduleNameInArg, "View");
    const moduleClassName = getModulePascalName(moduleNameInArg, "Model");
    const executeReplace = (relPath, replacedTexts) => {
        let finalContent = fs.readFileSync(targetPath + relPath).toString();
        for (let i = 0; i < replacedTexts.length; i++) {
            finalContent = finalContent.replace(new RegExp("\\{" + (i + 1) + "\\}", "g"), replacedTexts[i]);
        }
        fs.writeFileSync(targetPath + relPath, finalContent);
    };

    executeReplace("/index.ts", [moduleFullName, moduleMainComponentName, moduleClassName]);
    executeReplace("/component/Main.tsx", [moduleMainComponentName]);
}

function updateRootState(moduleNameInArg) {
    const rootStateFileContent = fs.readFileSync(rootStatePath).toString();
    const lastStateDeclarationIndex = rootStateFileContent.lastIndexOf("};");
    if (lastStateDeclarationIndex === -1) throw new Error("Cannot find state declaration in state.ts");

    const moduleFullName = getModuleName(moduleNameInArg);
    const moduleStateName = getModulePascalName(moduleNameInArg, "State");

    // Use 4 spaces, instead of \t, to keep consistent with Prettier
    const replacedRootStateFileContent = `import {State as ${moduleStateName}} from "module/${moduleNameInArg}/type";\n` + rootStateFileContent.substr(0, lastStateDeclarationIndex) + `    ${moduleFullName}: ${moduleStateName};\n    ` + rootStateFileContent.substr(lastStateDeclarationIndex);
    fs.writeFileSync(rootStatePath, replacedRootStateFileContent);
}

module.exports = function generate(env) {
    const moduleNameInArg = yargs.argv._[0];
    targetRootPath = env.targetRootPath;
    rootStatePath = env.rootStatePath;
    available1stLevelModuleNames = fs.readdirSync(env.targetRootPath).filter(_ => _ !== "main");
    console.info(chalk`{white.bold usage:} yarn module x/y`);
    console.info(`x must be: ${available1stLevelModuleNames.join("/")}, y must conform to naming convention: some-name`);

    try {
        const nameRegex = /^[a-z]+?(\-[a-z]+?)*$/;
        if (!fs.existsSync(rootStatePath)) throw new Error("File type/state.ts does not exist");
        if (!moduleNameInArg) throw new Error("Missing module name in command line");
        const splitModuleNames = moduleNameInArg.split("/");
        if (available1stLevelModuleNames.indexOf(splitModuleNames[0]) === -1) throw new Error(`Module [${moduleNameInArg.split("/")[0]}] does not belong to ${available1stLevelModuleNames.join("/")}`);

        const existedSubModules = fs.readdirSync(`${targetRootPath}/${splitModuleNames[0]}`);
        if (existedSubModules.indexOf(splitModuleNames[1]) !== -1) throw new Error(`Module ${moduleNameInArg} already exists`);

        if (!nameRegex.test(splitModuleNames[1])) throw new Error("Argument format error: " + splitModuleNames[1]);

        createModuleFolder(moduleNameInArg);
        updateRootState(moduleNameInArg);
        console.info(chalk`{white.bold Create module [${moduleNameInArg}] done!}`);
    } catch (e) {
        // Delete generated, if any error triggers after creating module folder
        if (moduleNameInArg.split("/")[1]) fs.removeSync(`${targetRootPath}/${moduleNameInArg}`);
        console.error(chalk`{red.bold Error: ${e.message}}`);
        process.exit(1);
    }
};
