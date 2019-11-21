const express = require('express')
const server = express()
const serverConfig = require('./serverConfig')
const authRoute = require('./routes/usersRouter');
const billsRouter = require('./routes/billsRouter');
const friendsRouter = require('./routes/friendsRouter');

server.use(express.json())
serverConfig(server)

server.get('/', (req, res) => {
    res.status(200).json({ api : 'running' })
})

server.use('/api/auth', authRoute); //localhost:4444/api/auth
server.use('/api/bills', billsRouter); //localhost:4444/api/bills
server.use('/api/friends', friendsRouter); //localhost:4444/api/friends

server.use(function notFound(req, res, next) {
    const error = new Error('Not found')
    error.status = 404
    next(error)
})

server.use(function errorHandler(error, req, res, next) {
    error.status = error.status || 500
    error.message = error.message || 'Internal server error.'

    res.status(error.status).json({ error: { message: error.message } })
})

module.exports = server;