const mongoose = require('mongoose');

const markheetSchema = new mongoose.Schema({
    name : String,
    studentId : String,
    rollNo:String,
    physics:Number,
    chemistry:Number,
    maths:Number,
});

module.exports = mongoose.model('marksheet', markheetSchema);