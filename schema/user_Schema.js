const mongoose = require('mongoose')
const user_Schema = mongoose.Schema({
    id: String,
    guildId: String,
    name: {
        type: String,
        default: 'user'
    },
    experience: {
        type: Number,
        default: 0
    },
    warns: {
        type: Array,
        default: []
    },
    countSymbol: {
        type: Number,
        default: 0
    },
    money: {
        type: Number,
        default: 0
    },
    level_battle_pass: {
        type: Number,
        default: 0
    }
},
    { versionKey: false})

//const User = mongoose.model('User', user_Schema, 'User')

module.exports = mongoose.model('Users', user_Schema)