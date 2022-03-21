const mongoose = require('mongoose')
const guild_Schema = mongoose.Schema({
        id: String,
        name: String,
        prefix: {
            type: String,
            default: '?'
        },
    },
    { versionKey: false})

//const User = mongoose.model('User', user_Schema, 'User')

module.exports = mongoose.model('Guilds', guild_Schema, 'Guilds')