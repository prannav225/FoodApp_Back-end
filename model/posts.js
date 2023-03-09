const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    author:{
        type:String,
        requried:true
    },
    title:{
        type:String,
        requried:true
    },
    summary:{
        type:String,
        requried:true
    },
    image:{
        type:String,
        requried:true
    },
    location:{
        type:String,
        requried:true
    }
})

module.exports = mongoose.model('Post',postSchema);