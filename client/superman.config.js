module.exports = {
    port: 9100,
    proxy: {
        '/api/': {
            target: 'https://localhost/',
            secure: false
        }
    }
}