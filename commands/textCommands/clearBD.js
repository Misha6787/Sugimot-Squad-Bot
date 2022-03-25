const { MessageEmbed } = require('discord.js');

module.exports = async (bot,message,args,argsF) => {

    // Проверки роли, и проверка на бота и т.д \\

    let ifRoles = 0;
    message.member.roles.cache.forEach(item => {
        if (item.id === '777304566844751902' ||
            item.id === '777304185380274206' ) {
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

    const User = await bot.User.find({guildId: message.guildId});

    User.forEach(item => {
        item.experience = 0;
        item.money = 0;
        item.countSymbol = 0;
        item.level_battle_pass = 0;

        item.save()
    })

    const exampleEmbed = new MessageEmbed()
        .setTitle('Дествие успешно выполненно!')
        .setDescription('База очищена')
        .setImage('https://i.imgur.com/XKSFDmC.jpg')
        .setColor('#4fff29')

    message.channel.send({ embeds:  [ exampleEmbed ]});


}

module.exports.names = ['очиститьбазу', 'судныйдень', 'clearbd'];