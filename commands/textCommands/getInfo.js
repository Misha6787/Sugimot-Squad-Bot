const {MessageEmbed, User} = require("discord.js");
const getCurrentLevel = require("../../helpers/getCurrentLevel");
const mongoose = require('mongoose')

module.exports = async (bot,message,args,argsF) => {

    const User = await bot.User.find({guildId: message.guildId});
    const thisUser = await bot.User.findOne({id: message.author.id, guildId: message.guildId});
    let guild = await bot.guilds.fetch('777301995803377704');

    const PermissionsBattlePass = await bot.Permissions_battle_pass.find();

    // const option_5 = {
    //     label: 'Улучшение личной роли',
    //     description: 'Ваша роль станет выше всех и будет отображаться в списке участников',
    //     value: 'upgrade_private_role'
    // }
    let arr = [];

    PermissionsBattlePass.forEach(item => {
        arr.push({
            label: item.options.label,
            description: item.options.description,
            value: item.name
        })
    })

    console.log(arr)


    //console.log(User)
}

module.exports.names = ['инфа'];
module.exports.type = 'moderation';
