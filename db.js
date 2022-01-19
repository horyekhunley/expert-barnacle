const mongoose = require('mongoose')

exports.connectionParameters = async() => {

  mongoose.connect(process.env.MONGOOSE_URI).then(() => {
    console.log('MongoDB connected...')
  }).catch((err) => {
    console.log('MongoDB conection error', err)
    process.exit
  })

}
