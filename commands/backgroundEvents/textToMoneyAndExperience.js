const checkLevel = require('../../helpers/checkLevel')
//const testBGfunc = require('../../helpers/testBGfunc')

module.exports = async (bot,message,args,argsF) => {

    // Проверки роли, и проверка на бота и т.д \\

    if (message.author.bot) return;

    //let ifRoles = 0;
    //message.member.roles.cache.forEach(item => item.id === '944259753587126333' ? ifRoles++ : '')
    //if (ifRoles === 0) return;

    if (message.content.substr(0, 4) === 'http') return

    // ================================= \\

    const User = await bot.User.findOne({id: message.author.id, guildId: message.guildId})

    if (User === null) return;

    let symbols = message.content.replace(/\s+/g, '').length + User.countSymbol

    if (symbols >= 500) {
        symbols -= 500
        User.money += 10
        User.experience += 100;

        await checkLevel(bot, message.author.id, message.guildId)
    }

    //await testBGfunc(bot, message, message.author.id, message.guildId)

    User.countSymbol = symbols
    User.save();
}