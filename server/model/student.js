const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    emailId:{type:String,require:true,unique:true},
    collegeId:String,
    mobileNo:Number
});

module.exports = mongoose.model('student', studentSchema);