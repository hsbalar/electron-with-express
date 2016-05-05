import express from "express";
import bodyParser from "body-parser";
import methodOverride from "method-override";
import cookieParser from "cookie-parser";
import passport from "passport";
import logger from "morgan";
import flash from "connect-flash";
import favicon from "serve-favicon";
import nunjucks from "nunjucks";

import fs from "fs";
import path from "path";

import session from "./session";
import config from "./config";

const app = express();

// view engine setup
nunjucks.configure('server/templates', Object.assign({
  autoescape: true,
  express: app
}, {}));

// pretty output
if (app.get('env') === 'development') {
  app.locals.pretty = true;
}

// enable logging
if (config.logging && config.logging.enable) {
  if (!fs.exists("log")) {
    fs.mkdirSync("log");
  }
  app.use(logger(config.logging.format || "combined", {
    stream: fs.createWriteStream(path.join("log", "access.log"), { flags: "a" })
  }));
}

// serve static content from 'public' dir
app.use(express.static(path.resolve('public')));
app.use(express.static(path.resolve('assets')));

// register body parsers
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// allow method override
app.use(methodOverride());

// session support
app.use(cookieParser(config.session.secret));
app.use(session);

// passport support
app.use(passport.initialize());
app.use(passport.session());

// flash message support
app.use(flash());

export default app;
