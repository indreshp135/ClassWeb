const mongoose = require("mongoose");

// Create Schema
const ProfSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    dept: {
        type: String,
        required: true,
    },
    profphoto: mongoose.Schema.Types.ObjectId,
    verified: {
        type: Boolean,
        default: false,
    },
    classroom: [
        { classname: { type: String, require: true }, coursecode: String },
    ],
    register_date: {
        type: Date,
        default: Date.now,
    },
    assignment: [
        {
            question: { type: String, default: true },
            profname: { type: String, require: true },
            coursecode: { type: String, require: true },
            classname: { type: String, require: true },
            filename: String,
            originalname: String,
            submissions: [
              {
                  regno: { type: Number, unique: true, require: true },
                  filename: String,
                  originalname: String,
              },
          ],
        },
    ],
    timetable: mongoose.Schema.Types.ObjectId,
});

const Prof = mongoose.model("Prof", ProfSchema);

module.exports = Prof;
