const { MessageEmbed } = require('discord.js');

module.exports = async (bot,message,args,argsF) => {
    let ifRoles = 0;
    message.member.roles.cache.forEach(item => {
        if (item.id === '777322473523249182' ||
            item.id === '900529098571546654' ||
            item.id === '777304185380274206' ||
            item.id === '777304566844751902') {
            ifRoles++;
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
    if (!args[0]) {
        message.channel.send({
            embeds: [
                {
                    title: `Введите имя пользователя!`,
                    color: '#ff0000'
                }
            ]
        })
        return;
    }
    let userId = args[0].replace(/[^+\d]/g, '');
    let BattlePassRoleId = '944259753587126333';
    try {
        let role = message.guild.roles.cache.find(role => role.id === BattlePassRoleId);
        let user = message.guild.members.cache.get(userId);
        user.roles.add(role);

        message.channel.send({
            embeds: [
                {
                    title: `Дествие успешно выполненно!`,
                    description: `Выдана роль <@&${BattlePassRoleId}> пользователю ${args[0]}`,
                    color: '#4fff29'
                }
            ]
        });


        const exampleEmbedImage = new MessageEmbed()
            .setImage('https://i.imgur.com/m7lznVe.gif')
            .setColor('#2f3136')

        const exampleEmbed = new MessageEmbed()
            .setTitle('Поздравляем с приобритением Battle Pass на нашем сервере Sugimoto Squad!')
            .setDescription('Теперь у вас есть доступ к новым чатам, валюте сервера и личным ролям!')
            .setThumbnail('https://i.imgur.com/eHX2Nbc.png')
            //.setAuthor(`Сегодня о ${user.username}`, `${message.author.avatarURL()}`)
            .setColor('#2f3136')

        user.send({
            embeds: [
                exampleEmbed,
                exampleEmbedImage
            ]
        })
             .then(message => console.log('complete action'))
             .catch(console.error);

    } catch {
        message.channel.send({
            embeds: [
                {
                    title: `Введите корректоное имя пользователя!`,
                    color: '#ff0000'
                }
            ]
        });
    }
}

module.exports.names = ['выдатьбп', 'addbattlepassrole'];