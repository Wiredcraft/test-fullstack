function builderConfig(builder) {
    return {
        mode: 'production',
        entry: builder.entry,
        output: {
            path: builder.initalObj.path,
            filename: `${builder.initalObj.library ? builder.initalObj.library : ""}.[name].js`,
            library: '[name]_Dll',
        },
        plugins: builder.plugins,
        bail: true
    };
}

module.exports = builderConfig;