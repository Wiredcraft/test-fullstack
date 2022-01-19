class AppBootHook {
    constructor(app) {
        this.app = app;
    }

    async didReady() {
        if (this.app.config.env === 'local' || this.app.config.env === 'unittest') {
            
        }
    }
}

module.exports = AppBootHook;