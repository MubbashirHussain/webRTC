const socket = require("socket.io");
const crypto = require("crypto");

module.exports = function (server) {

    const io = socket(server, {
        cors: {
            origin: "*"
        },
        transports: ['websocket', 'polling'],
        origins: '*:*',
        // transports: ['polling'],
    });

    let emailToSockeId = new Map();
    let sockeIdToEmail = new Map();
    io.on('connection', function (socket) {
        console.log("new User Connnected")
        socket.on('join-room', (data) => {
            let { email, roomId } = data
            // let roomId = crypto.randomUUID()
            emailToSockeId.set(email, socket.id)
            socket.join(roomId)
            socket.emit('joined-room', { email, roomId, socketId: socket.id })
            socket.broadcast.to(roomId).emit('user-joined', { email, roomId, socketId: socket.id })
            console.log(emailToSockeId)
        })
        socket.on('call-user', (data) => {
            let { email, offer, socketId } = data
            sockeIdToEmail.set(socketId, email)
            console.log("call-user", email)
            socket.to(socketId).emit('incoming-call', { from: email, socketId, offer })
        })
    })
}