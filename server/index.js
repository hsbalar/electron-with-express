import http from "http";

import config from "./config/config";
import mongodb from "./config/mongodb";
import passport from "./config/passport";
import * as setup from "./middleware/setup";

import app from "./config/express";
import routes from "./routes";

import User from './models/User';

export function start() {

  return new Promise((resolve, reject) => {

    mongodb().then((db) => {

      let server = http.createServer(app);

      // save references
      app.db = db;
      app.server = server;
      app.config = config;

      // init passport
      passport(app);

      // register setup check middleware
      app.use(setup.check);

      // setup routes
      routes(app);

      // start server
      app.server.listen(config.server.port, (err) => {
        if (err) {
          return reject(err);
        }
        resolve(app);
      });
    }, reject);
  });
};
