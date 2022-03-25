//const messageSchema = require('./schema/messageSchema')

module.exports = async (bot, member) => {

    //Добовление или проверка в базе этого сервера
    const Guild = await bot.Guild.findOne({id: member.guild.id})

    if (Guild === null) {
        const newGuild = new bot.Guild({
            id: member.guildId,
            name: member.guild.name,
            prefix: '?',
        })
        newGuild.save()
    }

    // Добовление юзера или проверка в базе данных
    const User = await bot.User.findOne({ id: member.id, guildId: member.guild.id })

    if (User === null) {
        const newUser = new bot.User ({
            id: member.id,
            guildId: member.guild.id,
            name: member.user.username,
        })
        newUser.save()
    }
}