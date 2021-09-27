const express = require('express')
const app = express()
const server = require('http').createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:8000',
        credentials: true
    }
})

const bodyParser = require('body-parser')

//lodash config
const lodash = require('lodash')
global._ = lodash

//jwt secret
const { apiSecretKey } = require('./jwt/config')
app.set('apiSecretKey', apiSecretKey)

//helpers
const { socketConn } = require('./socket-stuff/index')

//ORM init for check connection
const { sequelize } = require('./helper/connection')

//PORT setting
const PORT = process.env.PORT || 3000

//Cors setting
const cors = require('cors')
app.use(cors({credentials: true}))

//io settings
app.use((req, res, next) => {
    req.io = io
    next()
})

//import routes
const userRoute = require('./routes/users')
const postRoute = require('./routes/posts')
const commentRoute = require('./routes/comments')
const authRoute = require('./routes/auth')

//For post/put body content.
app.use(express.json())
app.use(bodyParser.urlencoded({extended: false}))

//middleware
const jwtVerifiy = require('./middlewares/checkToken')

//routes
app.use('/user', userRoute)
app.use('/post', postRoute)
app.use('/comment', jwtVerifiy, commentRoute)
app.use('/auth', authRoute)

socketConn(io)

server.listen(PORT, () => {
    console.log(`The server is running on: http://localhost:${PORT}`)
    sequelize.authenticate().then(e => {
        console.log('Connected to PgSQL')
    }).catch(e => {
        console.log(e)
    })
    // const options = require('./helper/options')
    // console.log(options('hakan', 'bebek', 'a'))
})
