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
    },
    voiceInterval: {
        type: Number,
        default: 0
    },
    permissions: {
        type: Object,
        default: {
            mute_members: false,
            move_members: false,
            private_role: false,
            create_private_room: false
        }
    }

},
    { versionKey: false})

//const User = mongoose.model('User', user_Schema, 'User')

module.exports = mongoose.model('Users', user_Schema)