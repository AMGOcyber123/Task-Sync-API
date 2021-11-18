const mongoose = require('mongoose')
const validator = require('validator')

const taskschema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
        trim: true
    },
    completed: {
        type: Boolean,
        default: false
    },
    creator: {
        require: true,
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }
}, {timestamps: true
})

const Task = mongoose.model('Task', taskschema)

module.exports = Task