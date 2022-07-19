const app = require("./app") // import the configured (routes added, etc.) app to be used
const connectDatabase = require("./config/database")

// Handling uncaught exception
process.on("uncaughtException", (err) => {
  console.log(`Error: ${err.message}`)
  console.log("Shutting down the server due to Uncaught Exception")
  process.exit(1)
})

if (process.env.NODE_ENV !== "PRODUCTION")
  require("dotenv").config({ path: "backend/config/config.env" })

connectDatabase()

const PORT = process.env.PORT || 3000

const server = app.listen(PORT, () => {
  console.log(`Server is working on http://localhost:${PORT}`)
})

// Unhandled Promise Rejection
process.on("unhandledRejection", (err) => {
  console.log(`Error: ${err.message}`)
  console.log("Shutting down the server due to unhandled promise rejection")
  server.close(() => {
    process.exit(1)
  })
})
