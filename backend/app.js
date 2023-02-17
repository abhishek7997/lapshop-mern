const express = require("express")
const app = express()
const cookieParser = require("cookie-parser")
const errorMiddleware = require("./middleware/error")
const path = require("path")

app.use(express.json()) // inbuilt Application-level middleware. express.json parses incoming requests with JSON payloads
app.use(cookieParser())

// Route imports
const product = require(path.join(__dirname, "./routes/productRoute"))
const user = require(path.join(__dirname, "./routes/userRoute"))

// app.use(<mount-path>, (function to be called on this <mount-path>))
app.use("/api/v1", product) // Application-level middleware
app.use("/api/v1", user)

app.use(express.static(path.join(__dirname, "../frontend/build")))
app.get("/*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../frontend/build/index.html"))
})

// Middleware for error
app.use(errorMiddleware) // Application-level middleware

module.exports = app
