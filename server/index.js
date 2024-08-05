require('dotenv').config();
const express = require('express')
const app = express();
const http = require("http");
const cors = require("cors");
const socketio = require("./functions/socket");
const bodyParser = require('body-parser');
app.use(cors());
app.use(bodyParser.json());

let server = http.createServer(app);
socketio(server)


app.get('/', (req, res) => { res.send("API is working") });


server.listen(process.env.PORT || 3001, function () { console.log("server is Runing at PORT " + process.env.PORT) })
