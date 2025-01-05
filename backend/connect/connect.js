require("dotenv").config();
const mongoose = require("mongoose");
const connection = process.env.CONNECTION_STRING;
// console.log(connection)
const connect =async ()=>{
    try {
        mongoose.connect(connection)
        
        return  Promise.resolve("DB Connected");
    } catch (error) {
        
        return  Promise.reject(new Error(`Error Occurs:${err}`));
    }


}
module.exports = connect;