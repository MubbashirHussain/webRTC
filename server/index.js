require('dotenv').config();
const express = requrie('express')
const app = express();


app.get('/', (req, res) => { });


app.listen(process.env.PORT || 8000, () => console.log("server is Runing at PORT " + process.env.PORT))