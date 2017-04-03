
const path = require('path');

const root = process.cwd();

module.exports = {
  logs: {
    logLevel: 'info',
    path: path.join(root, 'server/logs'),
    logConsoleLevel: 'info',
  },
  database: {
    path: path.join(root, 'server/data'),
  },
  host: "great-big-angular2-example.herokuapp.com",
  port: 80,
  nedb: "NEDB_BASE_PATH",
  mongodb: "DATABASE_URL",
  public: "../public/",
  auth: {
    token: {
      secret: "FEATHERS_AUTH_SECRET"
    },
    local: {},
    facebook: {
      clientID: "your facebook client id",
      clientSecret: "your facebook client secret",
      permissions: {
        scope: [
          "public_profile",
          "email"
        ]
      }
    },
    github: {
      clientID: "your github client id",
      clientSecret: "your github client secret",
      permissions: {
        "scope": []
      }
    },
    google: {
      clientID: "your google client id",
      clientSecret: "your google client secret",
      permissions: {
        scope: [
          "profile"
        ]
      }
    },
    successRedirect: "/chat.html"
  },
};
