const express = require('express')
const server = express()
const serverConfig = require('./serverConfig.js')

server.use(express.json())
serverConfig(server)

module.exports = server;