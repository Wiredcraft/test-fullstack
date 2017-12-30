const mongoose = require('mongoose')

const name = 'Talk'

const schema = {
    title: {
        type: String,
        required: true,
    },
    description: String,
    username: String,
    vote: Number,
}

const model = mongoose.model(name, schema)

module.exports = model
