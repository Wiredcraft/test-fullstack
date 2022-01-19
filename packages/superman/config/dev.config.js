const { merge } = require("webpack-merge");
const PATHS = require("./paths");
const parts = require("./webpack.parts");

const devConfig = merge([
  parts.setDevMode(),
  parts.setEntries({
    client: [PATHS.clientEntry]
  }),
  parts.setOutput(PATHS.outputDirectory),
  parts.startDevServer(),
  parts.setResolve({
    extensions: [".js", ".jsx"]
  }),
  parts.transpileJavaScript(),
  parts.compileStylesheet(),
  parts.handleStaticAssets(),
  parts.useHTMLTemplate(PATHS.htmlTemplate),
  parts.setHotModuleReplacement()
]);

module.exports = devConfig;