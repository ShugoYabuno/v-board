"use strict"

/**
 * Module dependencies.
 */
import compression from "compression"
import session from "express-session"
import methodOverride from "method-override"
import bodyParser from "body-parser"
import cookieParser from "cookie-parser"
// import mongoose from "mongoose"
// import connectMongo from 'connect-mongo/es5')
// import passport from 'passport')
import morgan from "morgan"
import config from "../config"
// const MongoStore = require("connect-mongo")(session)

const configure = (app) => {
  /**
   * Default settings.
   */
  app.disable("x-powered-by")
  app.use(morgan("dev"))
  app.use(compression())
  app.use(bodyParser.json({ limit: "1000mb" }))
  app.use(bodyParser.urlencoded({ extended: true, parameterLimit: 10000000 }))
  app.use(methodOverride())
  app.use(cookieParser())
  app.set("views", config.root + "/src/views")
  app.set("view engine", "ejs")
  app.engine("html", require("ejs").renderFile)

  /**
   * Session settings.
   */
  app.use(
    session({
      secret: config.secret.session,
      saveUnintialized: true,
      resave: false,
      // // Sessionの永続化
      // store: new MongoStore({
      //   mongooseConnection: mongoose.connection,
      //   db: "luna",
      // }),
    })
  )
}

export default configure
