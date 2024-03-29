const { EmbedBuilder } = require("discord.js");
const getCurrentLevel = require('../../helpers/getCurrentLevel')

module.exports = async (bot,message,args,argsF) => {

    // Проверки роли, и проверка на бота и т.д \\

    //let ifRoles = 0;
    let battle_pass = false;
    message.member.roles.cache.forEach(item => {
        if (item.id === '944259753587126333') {
            battle_pass = true;
        }
        // if (item.id === '777322473523249182' ||
        //     item.id === '900529098571546654' ||
        //     item.id === '777304185380274206' ||
        //     item.id === '777304566844751902' ||
        //     item.id === '914833857537261598' ||
        //     item.id === '944259753587126333') {
        //     ifRoles++
        // }
    })
    // if (ifRoles === 0) {
    //     message.channel.send({
    //         embeds: [
    //             {
    //                 title: 'У вас недостаточно прав!',
    //                 color: 0xff0000
    //             }
    //         ]
    //     })
    //     return;
    // }

    // ======================================= \\

    const User = await bot.User.findOne({id: message.author.id, guildId: message.guildId});
    const Guild = await bot.guilds.fetch(message.guildId);

    if (User === null) return;

    let balance = User.money;

    const elementLevel = (await getCurrentLevel(bot, User.level_battle_pass)).element

    let gif = elementLevel.profileGif ? elementLevel.profileGif : 'https://i.imgur.com/eHX2Nbc.png';

    const if_Battle_pass = battle_pass ? `
**Уровень боевого пропуска:** ${User.level_battle_pass}
**Опыт:** ${User.experience}
**Опыт до следующего уровня:** ${(1000 + 100 * User.level_battle_pass) - User.experience}
**Sugimoto Coins:** ${balance}
` : `
**Sugimoto Coins:** ${balance}
`
    const dateCreatedAt = Math.floor(new Date(message.author.createdAt).getTime()/1000),
        dateJoinedAt = Math.floor(new Date(message.member.joinedAt).getTime()/1000);

    const exampleEmbedImage = new EmbedBuilder()
         .setImage(gif)
         .setColor(0x2f3136)
    const exampleEmbed = new EmbedBuilder()
        .setTitle('Основная информация: ')
        .setDescription(`
**Имя пользователя:** ${User.name}#${message.author.discriminator} (${message.member.nickname})
**Дата регистрации: ** <t:${dateCreatedAt}:D> (<t:${dateCreatedAt}:R>)
**Присоединился:** <t:${dateJoinedAt}:D> (<t:${dateJoinedAt}:R>)`
+ if_Battle_pass +
'\u200b'
        )
        .setThumbnail(message.author.avatarURL())
        //.setImage(gif)
        .setAuthor({
            name: `Сегодня о ${message.member.nickname ? message.member.nickname : message.user.username}`,
            iconURL: message.author.avatarURL()
        })
        .setTimestamp()
        .setFooter({
            text: Guild.name,
            iconURL: Guild.iconURL()
        })
        .setColor(0x2f3136)

    message.reply({ embeds:  [ exampleEmbed, exampleEmbedImage ]});
}

module.exports.names = ['профиль', 'profile'];
module.exports.interaction = { //И слэш команда
    name: 'профиль', //И название должно быть такое, как у команды
    description: 'Посмотри на свой профиль!',
    defaultPermission: true //Про слэш команды можно узнать из документации
};
module.exports.type = 'for_all';