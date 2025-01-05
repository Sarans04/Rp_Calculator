const mongoose = require("mongoose");
const ResultSchema = new mongoose.Schema({
    PID:{
        type:String,
        require:true,
        unique:true
    },
    AdminMark:{
        type:Number,
        require:true
    },
    UserMark:{
        type:Number,
        require:true
    },
    Total:{
        type:Number,
        require:true
    }
})
const ResultModel   = mongoose.model("ResultSchema",ResultSchema);

module.exports = {   ResultModel };
