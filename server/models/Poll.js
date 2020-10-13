const mongoose = require('mongoose');

// Create Schema
const PollSchema = new mongoose.Schema(
    {
        question:String,
        option1:String,
        votes1:Number,
        option2:String,
        votes2:Number,
        resulted:Boolean,
        result:String,
        voted:[String]
    }
)

const Poll = mongoose.model('Poll', PollSchema);

module.exports =  Poll;