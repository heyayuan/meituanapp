const { default: mongoose } = require("mongoose");
const dishSchema = new mongoose.Schema({
    name:{
        type:String,
        required:Boolean
    },
    desc:{
        type:String,
        required:Boolean
    },
    image:{
        type:String,
        required:Boolean
    },
    category:{
        type:String,
        catearr:['川味','湘味','粤菜'],
        required:Boolean
    }
})