import User from "../models/User";

const ADMIN_USERNAME = "admin";

let checked = false;

export function check(req, res, next) {

  if (checked || req.path === "/setup") {
    return next();
  }

  User.findOne({ username: ADMIN_USERNAME }).exec((err, user) => {
    if (err) { return next(err); }
    if (!user) { return res.redirect("/setup"); }
    checked = true;
    return next();
  });
}

export function show(req, res, next) {

  let admin = req.flash("admin")[0];
  let error = req.flash("error")[0];

  User.findOne({ username: ADMIN_USERNAME }).exec((err, user) => {
    if (err) { return next(err); }
    if (user) {
      checked = true;
      return res.redirect("/");
    }
    res.render("setup.html", {
      error: error,
      admin: admin,
    });
  });
}

export function save(req, res, next) {

  let admin = req.body;
  let error = {};

  if (admin.password.length < 5) {
    error.short = "Password too short";
  }
  if (admin.password !== admin.passwordConfirm) {
    error.confirm = "Confirm assword doesn't match";
  }

  if (error.short || error.confirm) {
    req.flash("error", error);
    req.flash("admin", admin);
    return res.redirect("/setup");
  }

  let user = new User(admin);

  user.username = ADMIN_USERNAME;
  user.save(function (err) {
    if (err) { return next(err); }
    req.login(user, function (err) {
      if (err) { return next(err); }
      checked = true;
      res.redirect("/");
    });
  });
}
