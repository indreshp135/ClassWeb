const mongoose = require('mongoose');

// Create Schema
const ClassroomSchema = new mongoose.Schema({
    classname:{
        type:String,
        unique:true,
        required:true,
    },
    subjects:[{profname:{type:String,require:true},coursecode:{type:String,require:true}}],
    messages:[{sentby:{type:String,require:true},message:String,photo:mongoose.Schema.Types.ObjectId}],
    timetable:mongoose.Schema.Types.ObjectId,
    poll:[mongoose.Schema.Types.ObjectId],
    studymaterial:[{profname:{type:String,require:true},coursecode:{type:String,require:true},filename:String,originalname:String}],
    onlineclass:{happening:{type:Boolean,default:false},profname:String,roomno:String}    
})

const Classroom = mongoose.model('Classroom', ClassroomSchema);

module.exports =  Classroom;