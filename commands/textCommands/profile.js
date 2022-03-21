const { MessageEmbed } = require('discord.js');

module.exports = async (bot,message,args,argsF) => {
    let ifRoles = 0;
    message.member.roles.cache.forEach(item => {
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

    const User = await bot.User.findOne({id: message.author.id, guildId: message.guildId});
    let balance = User.money;

    //console.log(message.author.createdAt.toLocaleDateString())
    //console.log(message.member.joinedAt.toLocaleDateString())

    const exampleEmbedImage = new MessageEmbed()
        .setImage('https://i.imgur.com/m7lznVe.gif')
        .setColor('#2f3136')
    const exampleEmbed = new MessageEmbed()
        .setTitle('Основная информация: ')
        .setDescription(`
                    **Имя пользователя:** ${User.name}#${message.author.discriminator}
                    **Дата создания аккаунта: ** <t:${Math.floor(new Date(message.author.createdAt).getTime()/1000)}:D>
                    **Дата входа на сервер:** <t:${Math.floor(new Date(message.member.joinedAt).getTime()/1000)}:D>
                    **Sugimoto Coins:** ${balance}
                `)
        .setThumbnail(`${message.author.avatarURL()}`)
        .setAuthor(`Сегодня о ${User.name}`, `${message.author.avatarURL()}`)
        .setColor('#2f3136')

    message.channel.send({ embeds:  [ exampleEmbed, exampleEmbedImage ]});

}

module.exports.names = ['профиль', 'profile'];