const BROKER = Symbol('Application#broker');

module.exports = {
    get broker() {
        if (!this[BROKER]) {
            this[BROKER] = {
                call: async (action, params) => {
                    const { status, data = {} } = await this.curl(this.config.broker.url, {
                        method: 'POST',
                        contentType: 'json',
                        data: {
                            action: action,
                            params: params,
                        },
                        dataType: 'json',
                    });

                    if (status !== 200) {
                        throw Object.assign(new Error(), {
                            success: false,
                            name: "ApplicationError",
                            message: '服务未知异常'
                        });
                    }

                    if (!data.success) {
                        throw Object.assign(new Error(), {
                            success: false,
                            name: data.name,
                            data: data.data,
                            message: data.message
                        });
                    }
                    return data.data;
                }
            };
        }
        return this[BROKER];
    }
};