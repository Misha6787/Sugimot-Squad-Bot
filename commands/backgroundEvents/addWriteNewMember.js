//const messageSchema = require('./schema/messageSchema')

module.exports = async (bot, message, args, argsF) => {
    // Добовление или проверка в базе этого сервера
    const Guild = await bot.Guild.findOne({id: message.guildId})

    if (Guild === null) {
        const newGuild = new bot.Guild({
            id: message.guildId,
            name: message.guild.name,
            prefix: '?',
        })
        newGuild.save()
    }

    // Добовление юзера или проверка в базе данных
    const User = await bot.User.findOne({ id: message.author.id, guildId: message.guildId })

    if (User === null) {
        const newUser = new bot.User ({
            id: message.author.id,
            guildId: message.guildId,
            name: message.author.username,
        })
        newUser.save()
    }
}