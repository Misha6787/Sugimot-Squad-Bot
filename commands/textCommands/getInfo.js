const {MessageEmbed, User} = require("discord.js");
const getCurrentLevel = require("../../helpers/getCurrentLevel");
const mongoose = require('mongoose')

module.exports = async (bot,message,args,argsF) => {

    const User = await bot.User.find({guildId: message.guildId});
    const thisUser = await bot.User.findOne({id: message.author.id, guildId: message.guildId});

    //console.log(thisUser.permissions.mute_members)
    //console.log(thisUser.permissions.move_members)


    //console.log(User)
}

module.exports.names = ['инфа'];
module.exports.type = 'moderation';
