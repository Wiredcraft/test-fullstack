const { merge } = require("webpack-merge");
const PATHS = require("./paths");
const parts = require("./webpack.parts");

const productionConfig = merge([
  parts.setProductionMode(),
  parts.setEntries({
    client: [PATHS.clientEntry]
  }),
  parts.setOutput(PATHS.outputDirectory, true),
  parts.cleanDirectory(PATHS.outputDirectory, PATHS.appRoot),
  parts.createVendorChunk(["react|react-dom"]),
  parts.setResolve({
    extensions: [".js", ".jsx"]
  }),
  parts.handleStaticAssets(),
  parts.useHTMLTemplate(PATHS.htmlTemplate),
  parts.transpileJavaScript(),
  parts.compileStylesheet(true)
]);

module.exports = productionConfig;