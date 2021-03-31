const entryConfig = require("../entry");
const htmlPlugin = require("../plugins/htmlWebpack");
const tsLoader = require("../loaders/ts");


function pushList(list, ele) {
    if (Array.isArray(ele)) {
        ele.forEach((i) => {
            list.push(i);
        })
    } else {
        list.push(ele);
    }
}

class Builder {
    /**
     * 
     * @param {string} buildPath 
     * @param {string} libName 
     * @param {} entry 
     */
    constructor(buildPath, libName, publicPath,entry = "") {
        this.entry = {}; // entryConfig.getEntry("./src/pages/");
        this.plugins = [];
        this.loaders = [];
        this.cacheGroups = {};
        this.minimizer = [];
        this.alias = {};
        this.callList = [];
        this.config = {};
        this.initalObj = {
            path: "",
            library: "",
            publicPath: ""
        };
        this.proxy = {};
        this.initalObj.path = buildPath;
        this.initalObj.library = libName;
        this.initalObj.publicPath = publicPath;
        if (entry) {
            if (typeof entry === "string") {
                this.entry = entryConfig.getEntry(`${entry}\\`);
            } else {
                this.entry = entry;
            }
        }
    }

    setAlias(key, path) {
        if (path) {
            this.alias[key] = path;
        } else {
            this.alias = key;
        }
    }
    globalImport(importList) {
        entryConfig.globalImport(this.entry, importList);
    }
    usePlugin(plugin) {
        pushList(this.plugins, plugin);
    }
    useLoader(loader) {
        pushList(this.loaders, loader);
    }
    /**
     * 
     * @param {string} path 
     */
    useHtmlPlugin(path, scripts = [], css = []) {
        htmlPlugin({
            entry: this.entry,
            path,
            plugins: this.plugins,
            scripts,
            css
        });
    }
    /**
     * 
     * @param {string} path 
     */
    useTSLoader(path) {
        tsLoader(this.entry, this.plugins, this.loaders, path)
    }

    userMinimizer(minimizer) {
        pushList(this.minimizer, minimizer)
    }
    Config(f) {
        return (env, options) => {
            this.config = f(this);
            this.callList.forEach((fun) => {
                fun(this.config, env, options);
            });
            // console.log(this.config.module.rules)
            return this.config;
        }
    }
    splitChunks(key, options) {
        this.cacheGroups[key] = options;
    }
    beforeBuilder(fun) {
        this.callList.push(fun);
    }
    setEntry(key, enpoint) {
        if (enpoint) {
            this.entry[key] = enpoint;
        } else {
            this.entry = key;
        }
    }

    addEntry(key, enpoint) {
        pushList(this.entry[key], enpoint);
    }

    setProxy(setting) {
        this.proxy = setting;
    }
}
Builder.Mode = {
    development: "development",
    production: "production",
    none: "none"
}
module.exports = Builder;