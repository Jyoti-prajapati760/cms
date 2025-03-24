const mongoose = require('mongoose');

const collegeSchema = new mongoose.Schema({
    collegeName : String,
    address: String,
    city: String,
    mobileNo:Number
});

module.exports = mongoose.model('college',collegeSchema);