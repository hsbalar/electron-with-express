import home from './home';
import auth from './auth';
import setup from './setup';

export default function (app) {

  auth(app);
  setup(app);
  // index page
  home(app);
};
