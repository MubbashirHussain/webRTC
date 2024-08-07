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
            io.to(roomId).emit('user-joined', { email, roomId, socketId: socket.id })
            console.log(emailToSockeId)
        })
        socket.on('call-user', (data) => {
            let { offer, to } = data
            console.log("incomming call from", to)
            io.to(to).emit('incoming-call', { from: socket.id, offer })
        })
        socket.on("call-accepted", ({ to, Ans }) => {
            let fromEmail = sockeIdToEmail.get(socket.id)
            console.log("Email From", fromEmail)
            io.to(to).emit('call-accepted', { from: socket.id, fromEmail, Ans })
        })
    })
}