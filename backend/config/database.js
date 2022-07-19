const mongoose = require("mongoose")

const connectDatabase = () => {
  mongoose.connect(process.env.DB_URI).then((data) => {
    console.log(`Mongodb connected with server ${data.connection.host}`)
  })
  // .catch((err) => {
  //   console.log(`Error occured: ${err}`)
  // }) // We dont need catch anymore as we have created method to handle unhandled promise rejection in server.js
}

module.exports = connectDatabase
