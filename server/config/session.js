import session from "express-session";
import connectMongo from "connect-mongo";
import mongoose from "mongoose";

import config from "./config";

const MongoStore = connectMongo(session);

const store = new MongoStore({
  mongooseConnection: mongoose.connection,
  collection: "__session__"
});

// session middleware
export default session(Object.assign({
  resave: true,
  saveUninitialized: true
}, config.session, {
  store: store
}));
