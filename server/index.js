import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import session from 'express-session'

import { fileURLToPath } from 'url';

import userRoutes from './routes/user.js'
import postRoutes from './routes/post.js'

const app = express()
dotenv.config()

app.use((express.json({ limit: "30mb", extended: true})))
app.use((express.urlencoded({ limit: "30mb", extended: true})))
app.use((cors()))
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
}))

app.use('/users', userRoutes)
app.use('/posts', postRoutes)

app.get('/', (req, res) => {
    res.send('SERVER IS RUNNING')
  })

const DB_URL = process.env.DB_URL
const PORT = process.env.PORT || 8000

app.listen(PORT, () => console.log(`Server running on port: ${PORT}`))