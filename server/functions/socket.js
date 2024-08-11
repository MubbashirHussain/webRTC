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
        socket.on('call-user', (data) => { // user 1
            let { offer, to } = data
            console.log("incomming call from", to)
            io.to(to).emit('incoming-call', { from: socket.id, offer })
        })
        socket.on("call-accepted", ({ to, Ans }) => { // user 2
            let fromEmail = sockeIdToEmail.get(socket.id)
            console.log("Email From", to)
            io.to(to).emit('call-accepted', { from: socket.id, Ans })
        })
        socket.on("call-Connected", ({ to }) => {
            let fromEmail = sockeIdToEmail.get(to)
            console.log("call Connected", fromEmail)
            io.to(to).emit('call-Connected', { from: socket.id, to })
        })

        socket.on("nego-needed", ({ to, offer }) => {  // user 1
            console.log("Email to", to)
            io.to(to).emit('nego-incoming', { from: socket.id, offer })
        })
        socket.on("nego-done", ({ to, Ans }) => { // user 2
            console.log("Email From",)
            io.to(to).emit('nego-final', { from: socket.id, Ans })
        })
        socket.on("icecandidate", candidate => {
            console.log({ candidate });
            //broadcast to other peers
            socket.broadcast.emit("icecandidate", candidate);
        });
    })
}