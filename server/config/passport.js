import mongoose from "mongoose";
import passport from "passport";
import LocalStrategy from "passport-local";

export default function (app) {

  let User = mongoose.model("User");

  passport.serializeUser((user, next) => next(null, user.id));
  passport.deserializeUser((id, next) => {
    User.findById(id).exec((err, user) => {
      next(err, user);
    });
  });

  function authenticate(username, password, next) {

    User.findOne({ username: username }).exec((err, user) => {
      if (err) { return next(err); }
      if (!user) {
        return next(null, false, {
          message: "Incorrect username."
        });
      }

      user.comparePassword(password, (err, matched) => {
        if (err) { return next(err); }
        if (matched) {
          return next(null, user);
        }
        return next(null, false, {
          message: "Incorrect password"
        });
      });
    });
  }

  // local strategy
  passport.use(new LocalStrategy({
    usernameField: "username",
    passwordField: "password"
  }, authenticate));
}
