const express = require('express')
const server = express()
const serverConfig = require('./serverConfig')
const authRoute = require('./routes/usersRouter');

server.use(express.json())
serverConfig(server)

server.use('/api/auth', authRoute); //localhost:4444/api/auth

module.exports = server;