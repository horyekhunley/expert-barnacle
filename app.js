// import the modules
require('dotenv').config()
require('express-async-errors')
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const app = express()

//import routes
const userRoutes = require('./routes/user_route')
const authRoutes = require('./routes/auth')
const songRoutes = require('./routes/song_route')

//database connection
mongoose.connect(process.env.MONGOOSE_URI).then(() => {
  console.log('MongoDB connected...')
}).catch((err) => {
  console.log('MongoDB conection error', err)
  process.exit
})
// middleware
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())

//now use the routes we imported
app.use('/api/users', userRoutes)
app.use('/api/users', authRoutes)
app.use('/api/songs', songRoutes)

// server listen
const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`)
})