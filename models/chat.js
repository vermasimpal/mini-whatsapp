const mongoose = require("mongoose");
const chatSchema = new mongoose.Schema({
    from:{
        type:String,
        required:true,
    },
    to:{
        type:String,
    },
    msg:{
        type:String,
        maxLength:50,
    },
    created_at:{
        type:Date,

    }

});
const chat = mongoose.model("chat",chatSchema);
module.exports = chat;
