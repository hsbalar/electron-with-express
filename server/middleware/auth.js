import passport from "passport";

function encode(user) {
  return {
    id: user._id,
    fullName: user.fullName,
    username: user.username,
  };
}

/**
 * Secured middleware, used for authentication
 *
 */
export function secured(req, res, next) {
  if (req.isAuthenticated()) {
    return next();
  }
  if (req.xhr) {
    return res.status(401).end();
  }
  res.redirect("/login");
}

/**
 * Current user
 *
 */
export function currentUser(req, res, next) {
  if (req.user) {
    return res.json({
      user: encode(req.user)
    });
  }
  return res.status(401).end();
}

/**
 * SignIn middleware
 *
 */
export function signIn(req, res, next) {

  let authenticator = passport.authenticate("local", (err, user, info) => {
    if (err) { return next(err); }
    if (user === false) {
      if (req.xhr) {
        return res.status(401).end();
      }
      return res.redirect("/login");
    }
    req.login(user, (err) => {
      if (err) { return next(err); }
      if (req.xhr) {
        return res.json({ user: encode(user) });
      }
      return res.redirect("/");
    });
  });

  return authenticator(req, res, next);
}

/**
 * SignOut middleware
 *
 */
export function signOut(req, res, next) {
  req.logout();
  if (req.xhr) {
    return res.status(204).end();
  }
  return res.redirect("/");
}
