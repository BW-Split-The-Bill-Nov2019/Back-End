const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

module.exports = server => {
  server.use(helmet(), express.json(), cors())
};