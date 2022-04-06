const {MessageEmbed, User} = require("discord.js");
const getCurrentLevel = require("../../helpers/getCurrentLevel");
const mongoose = require('mongoose')

module.exports = async (bot,message,args,argsF) => {

    let Users = await bot.User.find({guildId: message.guildId});
    const thisUser = await bot.User.findOne({id: message.author.id, guildId: message.guildId});

    //console.log(thisUser.permissions.mute_members)
    //console.log(thisUser.permissions.move_members)

    // Users.forEach(item => {
    //     item.permissions.mute_members.date = 0;
    //     const thisUser = await bot.User.findOne({id: message.author.id, guildId: message.guildId});
    // })

    // for (let user in Users) {
    //     Users[user].permissions.mute_members.date = 0;
    //     Users[user].permissions.move_members.date = 0;
    //     // console.log(Users[user])
    // }

    //Users.save()
    //console.log(User)
}

module.exports.names = ['инфа'];
module.exports.type = 'moderation';
