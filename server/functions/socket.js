const socket = require("socket.io");
const crypto = require("crypto");

module.exports = function (server) {

    let emailToSockeId = new Map();
    const io = socket(server, {
        cors: {
            origin: "*"
        },
        transports: ['websocket', 'polling'],
        origins: '*:*',
        // transports: ['polling'],
    });

    io.on('connection', function (socket) {
        console.log("new User Connnected")
        socket.on('join-room', (data) => {
            let { email } = data
            let roomId = crypto.randomUUID()
            emailToSockeId.set(email, socket.id)
            socket.join(roomId)
            socket.emit('joined-room', { email, roomId, socketId: socket.id })
            socket.broadcast.to(roomId).emit('user-joined')
            console.log(emailToSockeId)
        })
    })
}