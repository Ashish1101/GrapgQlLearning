const mongoose = require('mongoose');
const { modelName } = require('./User');

const taskSchema = new mongoose.Schema(({
    title: {
        type : String,
        required: true
    },
    details: {
        type : String,
        required: true
    },
    user: {
        type : mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    date: {
        type : Date,
        default : Date.now
    }
}))

module.exports = mongoose.model('Task' , taskSchema)