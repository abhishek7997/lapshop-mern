const { createProxyMiddleware } = require("http-proxy-middleware")

module.exports = function (app) {
  if (process.env.NODE_ENV !== "PRODUCTION") {
    app.use(
      "/api",
      createProxyMiddleware({
        target: "http://localhost:4000",
        changeOrigin: true,
      })
    )
  }
}
