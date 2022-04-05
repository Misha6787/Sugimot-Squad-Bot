const mongoose = require('mongoose')
const permissions = mongoose.Schema({
        name: String,
        options: {
            label: String,
            description: String,
            price: Number
        }
    },
    { versionKey: false})

//const User = mongoose.model('User', userSchema, 'User')

module.exports = mongoose.model('permissions_battle_pass', permissions, 'permissions_battle_pass')