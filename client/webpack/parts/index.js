const aliasResolver = require('./alias-resolver')
const assetsCompressor = require('./assets-compressor')
const autoprefixer = require('./autoprefixer')
const babelLoader = require('./babel-loader')
const bundleExtractor = require('./bundle-extractor')
const cssMinifier = require('./css-minifier')
const devServer = require('./dev-server')
const dirCleaner = require('./dir-cleaner')
const faviconGenerator = require('./favicon-generator')
const htmlGenerator = require('./html-generator')
const htmlMinifier = require('./html-minifier')
const jsMinifier = require('./js-minifier')
const sassExtractor = require('./sass-extractor')
const sassLoader = require('./sass-loader')
const sourcemapsGenerator = require('./sourcemaps-generator')

module.exports = {
    aliasResolver,
    assetsCompressor,
    autoprefixer,
    babelLoader,
    bundleExtractor,
    cssMinifier,
    devServer,
    dirCleaner,
    faviconGenerator,
    htmlGenerator,
    htmlMinifier,
    jsMinifier,
    sassExtractor,
    sassLoader,
    sourcemapsGenerator,
}
