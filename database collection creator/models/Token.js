const mongoose = require('mongoose');

// Create Schema
const TokenSchema = new mongoose.Schema({
    userid:{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:'Student'
    },
    token: { type: String, required: true },
    createdAt: { type: Date, required: true, default: Date.now, expires: 43200 }
})

const Token = mongoose.model('Token', TokenSchema);

module.exports =  Token;