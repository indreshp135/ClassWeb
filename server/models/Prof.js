const mongoose = require('mongoose');

// Create Schema
const ProfSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
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
  profphoto:mongoose.Schema.Types.ObjectId,
  verified:{
    type:Boolean,
    default:false,
  },
  classroom:[{classname:{type:String,require:true},coursecode:String}],
  register_date: {
    type: Date,
    default: Date.now
  },
  timetable:mongoose.Schema.Types.ObjectId,
});

const Prof = mongoose.model('Prof', ProfSchema);

module.exports =  Prof;