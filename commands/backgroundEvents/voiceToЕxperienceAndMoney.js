const checkLevel = require("../../helpers/checkLevel");
//const testBGfunc = require('../../helpers/testBGfunc')
let timer;

module.exports = async (bot, oldState, newState) => {

    // Проверки роли, и проверка на бота и т.д \\

    let member = await bot.users.fetch(newState.id)
        .then(user => user)
        .catch(console.error)
    if (member.bot) return;

    //let ifRoles = 0;
    //newState.member.roles.cache.forEach(item => item.id === '944259753587126333' ? ifRoles++ : '')
    //if (ifRoles === 0) return;

    // ================================= \\

    const User = await bot.User.findOne({id: newState.id, guildId: newState.guild.id});

    if (User === null) return;

    if (!oldState.channel && newState.channel) {
        timer = setInterval(async () => {
            User.money += 1;
            User.experience += 10;

            await checkLevel(bot, newState.id, newState.guild.id)

            User.save();
            // console.log('coins +1')
        }, 1000 * 60);

    } else if (!newState.channel) {
        clearInterval(timer)
    }
    //await testBGfunc(bot, newState)
    User.save();
}