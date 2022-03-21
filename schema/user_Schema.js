const mongoose = require('mongoose')
const user_Schema = mongoose.Schema({
    id: String,
    guildId: String,
    money: {
        type: Number,
        default: 0
    },
    warns: {
        type: Array,
        default: []
    },
    name: {
        type: String,
        default: 'user'
    },
    countSymbol: {
        type: Number,
        default: 0
    },
    inVoiceChannel: {
        type: Boolean,
        default: false
    },
},
    { versionKey: false})

//const User = mongoose.model('User', user_Schema, 'User')

module.exports = mongoose.model('Users', user_Schema)