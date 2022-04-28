const {MessageEmbed, User, Guild} = require("discord.js");
const getCurrentLevel = require("../../helpers/getCurrentLevel");
const checkLevel = require('../../helpers/checkLevel')
const mongoose = require('mongoose')

module.exports = async (bot,message,args,argsF) => {

    let Users = await bot.User.find({guildId: message.guildId});
    const User = await bot.User.findOne({id: message.author.id, guildId: message.guildId});

    //let rolePermissions = await message.member.role.fetch('963011307785830500')

    let guild = await bot.guilds.fetch('777301995803377704');


    // Users.forEach(async (user) => {
    //     if (new Date(user.permissions.mute_members.date) <= new Date() && user.permissions.mute_members.status) {
    //         const member = guild.members.cache.get(user.id)
    //         user.permissions.mute_members.status = false;
    //         user.permissions.mute_members.date = 0;
    //         await member.roles.remove('960895927109943306');
    //         user.save();
    //         console.log('lll');
    //     } else if (new Date(user.permissions.move_members.date) <= new Date() && user.permissions.move_members.status) {
    //         const member = guild.members.cache.get(user.id)
    //         user.permissions.move_members.status = false;
    //         user.permissions.move_members.date = 0;
    //         await member.roles.remove('960895931065200720');
    //         user.save();
    //         console.log(user);
    //     }
    // })


    // let guildRole = await message.guild.roles.fetch('963011307785830481')
    // guildRole.setHoist(true)
    //     .then(updated => console.log(`Role hoisted: ${updated.hoist}`))
    //     .catch(console.error);

    // const days = 2;
    // const dayClose = thisUser.permissions.mute_members.date <= new Date() ? new Date() : thisUser.permissions.mute_members.date;
    //
    // console.log(dayClose)

    //const dayClose = new Date(today);
    //dayClose.setDate(dayClose.getDate() + days);

    //console.log(dayClose)

    // let guild = await bot.guilds.fetch(message.guildId);
    //
    // let channel = await guild.channels.fetch('961719339080376412');
    //
    // await channel.permissionOverwrites.edit(thisUser.id, { CONNECT: true });

    // rolePermissions.setHoist(true)
    //     .then(updated => console.log(`Role hoisted: ${updated.hoist}`))
    //     .catch(console.error);

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

    // Users.forEach(item => {
    //     if (item.name === "Illuminat") {
    //         item.money += 100;
    //         item.save();
    //     }
    // })

    //Users.save()
    //console.log(User)
}

module.exports.names = ['инфа'];
module.exports.type = 'moderation';
