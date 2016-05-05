import * as auth from "../middleware/auth";

export default function (app) {

  // serve index
  app.use("/", auth.secured, (req, res) => {
    res.render("index.html", {
      user: req.user
    });
  });
};
