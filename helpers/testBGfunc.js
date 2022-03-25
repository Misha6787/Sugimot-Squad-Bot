const { MessageEmbed } = require("discord.js");
const getCurrentLevel = require('./getCurrentLevel')

const testBGfunc = async (bot, message, userId, guildId) => {

    const User = await bot.User.findOne({id: userId, guildId: guildId});
    // const levelUser = User.level_battle_pass;

    const currentLevel = (await getCurrentLevel(bot, userId, guildId)).level
    const elementLevel = (await getCurrentLevel(bot, userId, guildId)).element

    let gif = elementLevel.profileGif ? elementLevel.profileGif : 'https://i.imgur.com/eHX2Nbc.png';

    gif = currentLevel === 0 ? elementLevel.receivingGif ? elementLevel.receivingGif : 'https://i.imgur.com/eHX2Nbc.png' : gif

    let member = await bot.users.fetch(userId)
        .then(user => user)
        .catch(console.error)

    let channel = await bot.channels.fetch('924300573774327858')
        .then(channel => channel)
        .catch(console.error)

    const exampleEmbedImage = new MessageEmbed()
        .setImage(`${gif}`)
        .setColor('#2f3136')
    const exampleEmbed = new MessageEmbed()
        .setTitle(`${User.name} поднял(а) уровень!`)
        .setDescription(`
                    Поздравляем! Теперь твой уровень - **${User.level_battle_pass}**
                `)
        .setThumbnail(`https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}`)
        .setAuthor(`Сегодня о ${User.name}`, `${message.author.avatarURL()}`)
        .setImage(`${gif}`)
        .setColor('RANDOM')

    //channel.send({ embeds:  [ exampleEmbed, exampleEmbedImage ]});
    channel.send({ embeds:  [ exampleEmbed ]});
    member.send({ embeds:  [ exampleEmbed ]});
}

module.exports = testBGfunc
