const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server)
const { socketConn } = require('./socket-stuff/index')
const { sequelize } = require('./helper/connection')
const { User } = require('./models/User')

const PORT = process.env.PORT || 3000

app.use((req, res, next) => {
    res.io = io
    next()
})

app.get('/', (req, res) => {
    res.sendFile(__dirname+'/index.html')
})

socketConn(io)

server.listen(PORT, () => {
    console.log(`The server is running on: http://localhost:${PORT}`)
    sequelize.authenticate().then(e => {
        console.log('Connected to PgSQL')
    }).catch(e => {
        console.log(e)
    })
})
