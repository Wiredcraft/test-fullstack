const express = require('express')
const mongoose = require('mongoose')
const morgan = require('morgan')
require('dotenv').config()
const passport = require('passport')
const { handleError, ErrorHandler } = require('./helpers/error')

const PORT = process.env.PORT || 3000

const app = express()

// use body parser to extract data from request
app.use(express.json())
app.use(express.urlencoded())

// use passport
app.use(passport.initialize())
// strategy jwt
require('./config/passport')(passport)

// console info of http
app.use(morgan('tiny'))

// mongodb connection
mongoose
  .connect(process.env.mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
  })
  .then(() => console.info('MongoDB Connected'))
  .catch((err) => console.error(err))

// import routes
const user = require('./routes/user')
const news = require('./routes/news')

// use routes
app.use('/api/user', user)
app.use('/api/news', news)

// central error handling
app.use((err, req, res, next) => {
  handleError(err, res)
})

app.listen(PORT, () => {
  console.debug(`App listening on :${PORT}`)
})
