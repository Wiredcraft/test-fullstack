module.exports = ({ port, proxy } = {}) => ({
    devServer: {
        port,
        proxy,
        stats: 'errors-only',
    },
})
