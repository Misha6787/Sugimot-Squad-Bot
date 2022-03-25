const mongoose = require('mongoose')
const bpmonth = mongoose.Schema({
        month: Number,
        nameAnime: String,
        level: {
            0: {
                receivingGif: String,
                rofileGifString: String,
                nameRole: String
            },
            10: {
                receivingGif: String,
                profileGif: String,
                nameRole: String
            },
            20: {
                receivigGif: String,
                profileGif: String,
                nameRole: String
            },
            30: {
                receivigGif: String,
                profileGif: String,
                nameRole: String
            },
            40: {
                receivigGif: String,
                profileGif: String,
                nameRole: String
            },
            50: {
                receivigGif: String,
                profileGif: String,
                nameRole: String
            },
            60: {
                receivigGif: String,
                profileGif: String,
                nameRole: String
            },
            70: {
                receivigGif: String,
                profileGif: String,
                nameRole: String
            },
            80: {
                receivigGif: String,
                profileGif: String,
                nameRole: String
            },
            90: {
                receivigGif: String,
                profileGif: String,
                nameRole: String
            },
            100: {
                receivigGif: String,
                profileGif: String,
                nameRole: String
            }
        }
    },
    { versionKey: false})

//const User = mongoose.model('User', userSchema, 'User')

module.exports = mongoose.model('battle_pass_lvl', bpmonth, 'battle_pass_lvl')