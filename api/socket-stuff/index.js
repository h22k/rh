function socketConn(io) {
    io.on('connection', socket => {
        console.log('kullanıcı bağlandı!', socket.id)

        socket.on('msg', data => {
            console.log(data)
        })

    })
}

module.exports = {
    socketConn
}