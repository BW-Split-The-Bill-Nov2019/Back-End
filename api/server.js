const express = require('express')
const server = express()
const serverConfig = require('./serverConfig')
const authRoute = require('./routes/usersRouter');
const billsRouter = require('./routes/billsRouter');
const friendsRouter = require('./routes/friendsRouter');

server.use(express.json())
serverConfig(server)

server.use('/api/auth', authRoute); //localhost:4444/api/auth
server.use('./api/bills', billsRouter); //localhost:4444/api/bills
server.use('./api/friends', friendsRouter); //localhost:4444/api/friends

module.exports = server;