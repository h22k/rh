function socketConn(io) {
    io.on('connection', socket => {
        console.log(`user connected: ${socket.id}`)
        socket.on('postCreated', data => {
            io.emit('postC', {
                msg: `Post created by user id: ${data.user_id}`,
                user_id: data.user_id
            })
        })
    })
}

module.exports = {
    socketConn
}