/**
 * Main Application File
 */
"use strict"

/**
 * Module dependencies.
 */
import configure from "./lib/configure.js"
import express from "express"
import header from "./lib/header.js"
import router from "./routes/v1"

const app = express()

/**
 * Configure Express Server.
 */
configure(app)

/**
 * header dependencies.
 */
header(app)

/**
 * API Routing.
 */
app.use("/v1", router)

/**
 * Test API.
 */
app.get("/header", (req, res) => {
  console.log(res.connection._httpMessage.socket._httpMessage)
  res.json({
    username: "test successful!",
  })
})

/**
 * Start Server.
 */
module.exports = {
  path: "/api",
  handler: app,
}
