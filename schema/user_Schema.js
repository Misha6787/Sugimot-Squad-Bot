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
        mute_members: {
            status: {
                type: Boolean,
                default: false
            },
            cost: {
                type: Number,
                default: 0
            }
        },
        move_members: {
            status: {
                type: Boolean,
                default: false
            },
            cost: {
                type: Number,
                default: 0
            }
        },
        private_role: {
            status: {
                type: Boolean,
                default: false
            },
            used_command: {
                type: Boolean,
                default: false
            }
        },
        create_private_room: {
            type: Boolean,
            default: false
        },
        upgrade_private_role: {
            type: Boolean,
            default: false
        }
    }

},
    { versionKey: false})

//const User = mongoose.model('User', user_Schema, 'User')

module.exports = mongoose.model('Users', user_Schema, 'Users')