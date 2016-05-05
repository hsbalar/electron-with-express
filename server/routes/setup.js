import * as setup from "../middleware/setup";

export default function (app) {

  app.route("/setup")
    .get(setup.show)
    .post(setup.save);
}
