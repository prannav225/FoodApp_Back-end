const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    name:{
        type:String,
        requierd:true,
    },
    mobile_number:{
        type:Number,
        requried:true
    },
    email:{
        type:String,
        requried:true
    },
    password:{
        type:String,
        requried:true
    }
    
})
module.exports = mongoose.model("User",userSchema);