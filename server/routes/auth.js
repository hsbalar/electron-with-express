import * as auth from "../middleware/auth";

export default function (app) {

  app.get("/auth", auth.currentUser);
  app.post("/auth", auth.signIn);
  app.all("/signout", auth.signOut);

  app.get("/login", (req, res) => {
    res.render("login.html");
  });
  app.post("/login", auth.signIn);
  app.all("/logout", auth.signOut);
}
