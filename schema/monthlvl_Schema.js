const mongoose = require('mongoose')
const bpmonth = mongoose.Schema({
        month: Number,
        nameAnime: String,
        level: {
            '0': {
                receivingGif: String,
                profileGif: String,
                nameRole: String
            },
            '10': {
                receivingGif: String,
                profileGif: String,
                nameRole: String
            },
            '20': {
                receivingGif: String,
                profileGif: String,
                nameRole: String
            },
            '30': {
                receivingGif: String,
                profileGif: String,
                nameRole: String
            },
            '40': {
                receivingGif: String,
                profileGif: String,
                nameRole: String
            },
            '50': {
                receivingGif: String,
                profileGif: String,
                nameRole: String
            },
            '60': {
                receivingGif: String,
                profileGif: String,
                nameRole: String
            },
            '70': {
                receivingGif: String,
                profileGif: String,
                nameRole: String
            },
            '80': {
                receivingGif: String,
                profileGif: String,
                nameRole: String
            },
            '90': {
                receivingGif: String,
                profileGif: String,
                nameRole: String
            },
            '100': {
                receivingGif: String,
                profileGif: String,
                nameRole: String
            }
        }
    },
    { versionKey: false})

//const User = mongoose.model('User', userSchema, 'User')

module.exports = mongoose.model('battle_pass_lvl', bpmonth, 'battle_pass_lvl')