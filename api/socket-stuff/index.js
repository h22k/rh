function socketConn(io) {
    io.on('connection', socket => {
        console.log(`user connected: ${socket.id}`)

        socket.on('msg', data => {
            console.log(data)
        })

    })
}

module.exports = {
    socketConn
}