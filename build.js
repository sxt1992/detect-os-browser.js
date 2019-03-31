const path = require('path');
const fs = require('fs');
const rollup = require('rollup');
const commonjs = require('rollup-plugin-commonjs');
const uglify = require('rollup-plugin-uglify').uglify;

const config = {
    input: path.resolve(__dirname, 'browser.js'),
    output: {
        file: path.resolve(__dirname, 'lib', 'detectOsBrowser'),
        format: 'umd',
        banner: '/*!\n * detectOsBrowser.js\n' +
            ` * (c) 2019-${new Date().getFullYear()} Taoxj\n` +
            ' * Released under the MIT License.\n' +
            ' */',
        name: 'detectOsBrowser'
    },
    plugins: [commonjs()]
};

const genFiles = [config, JSON.parse(JSON.stringify(config))];
genFiles[0].output.file += '.js';

genFiles[1].output.file += '.min.js';
genFiles[1].plugins = [commonjs(), uglify()];

genFiles.forEach((cfg, index) => rollup.rollup(cfg).then(bundle => bundle.generate(cfg.output)).then(({ output: [{ code }] }) => {
    mkdirs(path.dirname(cfg.output.file));
    let outCode = code;
    if (cfg.output.file.indexOf('.min.js') > -1) {
        outCode = `${cfg.output.banner}\n${code}`;
    }
    fs.writeFileSync(cfg.output.file, outCode);
    console.log(`${index + 1}. created \x1b[1m\x1b[34m${path.basename(cfg.output.file)}\x1b[39m\x1b[22m success !`);
}));

function mkdirs(dir) {
    if (!fs.existsSync(dir)) {
        mkdirs(path.dirname(dir));
        fs.mkdirSync(dir);
    }
};