const express = require('express');
const app = express();
const cors = require("cors");
const connect = require("./connect/connect");
const routes  = require("./routes/routes")
app.use(express.json())
app.use(cors())
app.use("/",routes)
connect().then((msg)=>{
    console.log(msg);
}).catch((err)=>{
    console.log(err);
})
module.exports = app;