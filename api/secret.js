module.exports = {
    development: {
      jwtSecret: process.env.JWT_SECRET || "all your passwords are belong to us"
    },
    testing: {
      jwtSecret: process.env.JWT_SECRET || "all your passwords are belong to us"
    },
    production: {
      jwtSecret: process.env.JWT_SECRET || "all your passwords are belong to us"
    }
  };