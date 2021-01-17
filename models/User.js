const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    email : {
        type : String,
        required:true
    },
    password : {
        type : String,
        required:true
    },
    date: {
        type : Date,
        default : Date.now
    },
    tasks : [{
        type : mongoose.Schema.Types.ObjectId,
        ref:'Task'
    }]
})

module.exports = mongoose.model('User' , userSchema)