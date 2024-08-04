require('dotenv').config();
const express = requrie('express')
const app = express();


app.get('/', (req, res) => { res.send("API is working") });


app.listen(process.env.PORT || 8000, () => console.log("server is Runing at PORT " + process.env.PORT))