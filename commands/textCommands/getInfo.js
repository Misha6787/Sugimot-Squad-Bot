const {MessageEmbed, User} = require("discord.js");
const getCurrentLevel = require("../../helpers/getCurrentLevel");
const mongoose = require('mongoose')

module.exports = async (bot,message,args,argsF) => {

    const User = await bot.User.find({guildId: message.guildId});
    const thisUser = await bot.User.findOne({id: message.author.id, guildId: message.guildId});
    let guild = await bot.guilds.fetch('777301995803377704');
    const days = 2;
    const today = new Date()
    const tomorrow = new Date(today)

    User.forEach(item => {
        if (thisUser.id === item.id) {
            //console.log(new Date(item.permissions.mute_members.date))
            //console.log(new Date(dateNow).getTime())
            //console.log(new Date(dateNow + active_days).getTime())
            //tomorrow.setDate(tomorrow.getDate() + days)
            const member = guild.members.cache.get(User.id)
            console.log(member)
        }
        // if (new Date(item.permissions.mute.members.date) >= new Date()) {
        //
        // }
    })


    //console.log(User)
}

module.exports.names = ['инфа'];
module.exports.type = 'moderation';
