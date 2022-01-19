require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const app = express()

mongoose.connect(process.env.MONGOOSE_URI).then(() => {
  console.log('MongoDB connected...')
}).catch((err) => {
  console.log('MongoDB conection error', err)
  process.exit
})

const port = process.env.PORT || 5000
app.listen(port, () => {
  console.log(`Server running in http://localhost:${port}`)
})