const { MessageEmbed } = require('discord.js');
const getCurrentLevel = require('../../helpers/getCurrentLevel')

module.exports = async (bot,message,args,argsF) => {

    // Проверки роли, и проверка на бота и т.д \\

    let ifRoles = 0;
    let battle_pass = false;
    message.member.roles.cache.forEach(item => {
        if (item.id === '944259753587126333') {
            battle_pass = true
        }
        if (item.id === '777322473523249182' ||
            item.id === '900529098571546654' ||
            item.id === '777304185380274206' ||
            item.id === '777304566844751902' ||
            item.id === '914833857537261598' ||
            item.id === '944259753587126333') {
            ifRoles++
        }
    })
    if (ifRoles === 0) {
        message.channel.send({
            embeds: [
                {
                    title: `У вас недостаточно прав!`,
                    color: '#ff0000'
                }
            ]
        })
        return;
    }

    // ======================================= \\

    const User = await bot.User.findOne({id: message.author.id, guildId: message.guildId});

    if (User === null) return;

    let balance = User.money;

    //console.log(message.author.createdAt.toLocaleDateString())
    //console.log(message.member.joinedAt.toLocaleDateString())

    //const battle_pass_level = bot.AnimeMonth.level;

    //battle_pass_level.values(User.level_battle_pass)

    const currentLevel = (await getCurrentLevel(bot, User.id, User.guildId)).level
    const elementLevel = (await getCurrentLevel(bot, User.id, User.guildId)).element

    let gif = elementLevel.profileGif ? elementLevel.profileGif : 'https://i.imgur.com/eHX2Nbc.png';

    gif = currentLevel === 0 ? elementLevel.receivingGif ? elementLevel.receivingGif : 'https://i.imgur.com/eHX2Nbc.png' : gif

    // console.log(elementLevel.profileGif)
    // console.log(elementLevel.receivingGif)
    // console.log(Object.keys(elementLevel))

    const if_Battle_pass = battle_pass ? `
                        **Уровень боевого пропуска:** ${User.level_battle_pass}
                        **Опыт:** ${User.experience}
                        **Опыт до следующего уровня:** ${(1000 + 100 * User.level_battle_pass) - User.experience}
                        **Sugimoto Coins:** ${balance}
                    ` : `
                            **Sugimoto Coins:** ${balance}
                        `

    const exampleEmbedImage = new MessageEmbed()
        .setImage(`${gif}`)
        .setColor('#2f3136')
    const exampleEmbed = new MessageEmbed()
        .setTitle('Основная информация: ')
        .setDescription(`
                    **Имя пользователя:** ${User.name}#${message.author.discriminator}
                    **Дата создания аккаунта: ** <t:${Math.floor(new Date(message.author.createdAt).getTime()/1000)}:D>
                    **Дата входа на сервер:** <t:${Math.floor(new Date(message.member.joinedAt).getTime()/1000)}:D>`
                    + if_Battle_pass
        )
        .setThumbnail(`${message.author.avatarURL()}`)
        .setAuthor(`Сегодня о ${User.name}`, `${message.author.avatarURL()}`)
        .setColor('#2f3136')

    message.channel.send({ embeds:  [ exampleEmbed, exampleEmbedImage ]});

}

module.exports.names = ['профиль', 'profile'];