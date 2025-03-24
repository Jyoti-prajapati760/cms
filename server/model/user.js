const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    firstName: String,
    lastName: String,
    email: { type: String, required: true, unique: true },
    password: String,
    filename: String,  
    filepath: String,  
    uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('User', userSchema);
