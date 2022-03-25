//const messageSchema = require('./schema/messageSchema')

module.exports = async (bot, member) => {

    console.log('fdsfsfdsdsfdsfdf')
    console.log(member)

    //Добовление или проверка в базе этого сервера
    const Guild = await bot.Guild.findOne({id: member.guildId})

    console.log(member)

    if (Guild === null) {
        const newGuild = new bot.Guild({
            id: member.guildId,
            name: member.guild.name,
            prefix: '?',
        })
        newGuild.save()
    }

    // Добовление юзера или проверка в базе данных
    const User = await bot.User.findOne({ id: member.author.id, guildId: member.guildId })

    if (User === null) {
        const newUser = new bot.User ({
            id: member.id,
            guildId: member.guildId,
            name: member.username,
        })
        newUser.save()
    }
}