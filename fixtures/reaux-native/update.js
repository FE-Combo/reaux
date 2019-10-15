const fs = require('fs-extra');

function generate() {
    fs.mkdirsSync('node_modules/reaux');
    fs.copySync('../../packages/reaux', 'node_modules/reaux', {
        dereference: true,
    });
    const reauxPackage = fs
        .readFileSync('node_modules/reaux/package.json')
        .toString()
        .replace(/index.js/g, 'index.ts');
    fs.writeFileSync('node_modules/reaux/package.json', reauxPackage);

    fs.mkdirsSync('node_modules/reaux-native');
    fs.copySync('../../packages/reaux-native', 'node_modules/reaux-native', {
        dereference: true,
    });
    const reauxNativePackage = fs
        .readFileSync('node_modules/reaux-native/package.json')
        .toString()
        .replace(/index.js/g, 'index.ts');
    fs.writeFileSync(
        'node_modules/reaux-native/package.json',
        reauxNativePackage,
    );
}

generate();
