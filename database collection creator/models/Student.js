const mongoose = require('mongoose');

// Create Schema
const StudentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  regno: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  },
  dept:{
    type:String,
    required:true
  },
  year:{
    type:String,
    required:true,
  },
  studentphoto:mongoose.Schema.Types.ObjectId,
  verified:{
    type:Boolean,
    default:false,
  },
  classname:{
    type:String,
    required:true,
  },
  CR:{
    type:Boolean,
    default:false,
  },
  result:[{coursecode:String,marks:String,testtype:String}],
  register_date: {
    type: Date,
    default: Date.now
  }
});

const Student = mongoose.model('Student', StudentSchema);

module.exports =  Student;
