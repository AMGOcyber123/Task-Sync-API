const mongoose = require('mongoose')
const validator = require('validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const Task = require('./task')

const Userschema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique : true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new Error('Email is invalid')
            }
        }
    },
    password: {
        type: String,
        required: true,
        minlength: 7,
        trim: true,
        validate(value) {
            if (value.toLowerCase().includes('password')) {
                throw new Error('Password cannot contain "password"')
            }
        }
    },
    age: {
        type: Number,
        default: 0,
        validate(value) {
            if (value < 0) {
                throw new Error('Age must be a postive number')
            }
        }
    },
    tokens : [{
        token : {
            type : String,
            required : true
        }
    }]
},
    {
        timestamps : true
})

// Virtual Property 

Userschema.virtual('tasks',{
    ref : 'Task',
    localField : '_id',
    foreignField : 'creator'    
})

// JWT authentication 

Userschema.methods.generateAuthToken = async function() {
    const user = this
    const token = jwt.sign({_id : user._id.toString() } , 'thisismysecret')
    user.tokens = user.tokens.concat({ token })
    await user.save()
    return token
}


Userschema.statics.findByCredentials = async (email, password) => {
    const user = await User.findOne({ email })

    if (!user) {
        throw new Error('Unable to login')
    }

    const isMatch = await bcrypt.compare(password, user.password)

    if (!isMatch) {
        throw new Error('Unable to login')
    }

    return user
}

//hash the plain text password 
Userschema.pre('save', async function (next) {
    const user = this

    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }

    next()
})

//middleware to remove user and their tasks

Userschema.pre('remove', async function(next){
    const user = this
    await Task.deleteMany({creator : user._id}) 
    next()
})

Userschema.methods.toJSON = function()
{
    const user = this
    const userObj = user.toObject()
    delete userObj.password
    delete userObj.tokens
    return userObj
}

const User = mongoose.model('User', Userschema)

module.exports = User