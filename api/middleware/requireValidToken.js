const jwt = require("jsonwebtoken");
let secrets = require('../secret');
secrets = secrets[process.env.DB_ENV];

module.exports = {
  myprivate: function(req, res, next) {
    const token = req.headers.authorization;
    jwt.verify(token, secrets.jwtSecret, (err, decodedToken) => {
      if (err) {
        return res.status(401).json({ msg: "unauthorized" });
      }
      req.decodedToken = decodedToken;
      next();
    });
  },
};