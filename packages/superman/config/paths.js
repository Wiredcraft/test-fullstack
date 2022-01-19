const path = require("path");

const appRoot = path.resolve(process.cwd());

const PATHS = {
  appRoot,
  htmlTemplate: path.join(appRoot, "public/index.html"),
  clientEntry: path.join(appRoot, "src/index.js"),
  outputDirectory: path.join(appRoot, "build/"),
};

module.exports = PATHS;