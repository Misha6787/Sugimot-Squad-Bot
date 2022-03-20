const mongoose = require('mongoose')
const userSchema = mongoose.Schema({
    id: String,
    username: {
        type: String,
        default: 'user'
    },
},
    { versionKey: false})

//const User = mongoose.model('User', userSchema, 'User')

module.exports = mongoose.model('Users', userSchema)