const mongoose = require('mongoose');


const roleSchema =new mongoose.Schema({
    name:{type:String,require:true},
    roll:{type:String,require:true},
    email:{type:String,require:true,unique:true},
    password:{type:String,require:true},
    time:{type:Date,default:Date.now},
})

module.exports = mongoose.model('role', roleSchema);


