#! /usr/bin/env node
const path = require('path');
const spawn = require("cross-spawn");

const [task] = process.argv.slice(2);
const devConfig = require.resolve(`./config/dev.config.js`);
const prodConfig = require.resolve(`./config/prod.config.js`);

let result;

switch (task) {
    case "dev": {
        result = spawn.sync(
            path.resolve(path.resolve(require.resolve('webpack-cli'), '../../bin/cli.js')),
            ["serve", "--config", devConfig, "--progress"],
            { stdio: "inherit" }
        );
        break;
    }
    case "build": {
        result = spawn.sync(
            path.resolve(path.resolve(require.resolve('webpack-cli'), '../../bin/cli.js')),
            ["--config", prodConfig, "--progress"],
            { stdio: "inherit" }
        );
        break;
    }
    case "preview": {
        const output = require(prodConfig).output.path;
        result = spawn.sync(
            path.resolve(path.resolve(require.resolve('local-web-server'), '../bin/cli.js')),
            ["--config-file", path.resolve(output, 'superman.preview.js' )],
            { stdio: "inherit", cwd: output }
        );
        break;
    }
    default:
        console.log(`Unknown script "${task}".`);
}

if (result.signal) {
    process.exit(1);
}

process.exit(result.status);