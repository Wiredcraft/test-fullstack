// Env init
require('dotenv').config()
const {
    DATABASE,
    SERVER_PORT,
} = process.env


// DB init
const mongoose = require('mongoose')
mongoose.connect(DATABASE)
mongoose.Promise = global.Promise


// Server init
const express = require('express')
const api = require('./api')
const app = express()

app.use(require('body-parser').json())

app.use('/api/talks', api.talks)

app.use((err, req, res, next) => {
    console.log(err)
    res.end()
})

app.listen(SERVER_PORT, () =>
    console.log(`Server listen on port ${SERVER_PORT}`)
)
