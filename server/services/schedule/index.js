const schedule = require('node-schedule');

module.exports = {
    name: 'Schedule',
    config: {
        ...require('../../config').schedule
    },

    async start() {
        this.schedule = schedule;
    },

    add: {
        params: ["rule", "action"],
        handler: async function(params) {
            this.schedule.scheduleJob(params.rule, () => {
                this.broker.call(params.action);
            })
        }
    }
}