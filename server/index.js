require('dotenv').config();
const express = require('express')
const app = express();
const { Server } = require("socket.io");

const io = new Server();

io.on('connection', (socket) => {
    console.log('a user connected');
});


app.get('/', (req, res) => { res.send("API is working") });


app.listen(process.env.PORT || 8000, () => console.log("server is Runing at PORT " + process.env.PORT))