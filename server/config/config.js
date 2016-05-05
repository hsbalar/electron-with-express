export default {

  // mongodb configuration
  //remove <> and write your db user & pass 
  database: {
    url: "mongodb://<uname>:<password>@ds017231.mlab.com:17231/google-db",
  },

  // session configuration
  session: {
    name: "sessionid",
    secret: "secret",   // use some strong secret key
    cookie: {
      path: "/",
      secure: false,
      maxAge: 3600000
    }
  },

  // http logging
  logging: {
    enable: false,
    format: "combined"
  },

  // server config
  server: {
    host: "localhost",
    port: 3000
  }
};
