const { MessageEmbed } = require('discord.js');

module.exports = async (bot,message,args,argsF) => {

    // Проверки роли, и проверка на бота и т.д \\

    let ifRoles = 0;
    message.member.roles.cache.forEach(item => {
        if (item.id === '900529098571546654' ||
            item.id === '777304185380274206' ||
            item.id === '914833857537261598' ||
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

    // ======================================= \\

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

        const animeMonth = await bot.AnimeMonth;
        const zeroLevel = animeMonth.level[0];

        const Guild = await bot.guilds.fetch(message.guildId);

        const exampleEmbed = new MessageEmbed()
            .setTitle('Поздравляем с приобритением Battle Pass на нашем сервере Sugimoto Squad!')
            .setDescription(`
                Вы получили доступ к роли **${zeroLevel.nameRole}**, подробная информация о Battle Pass - **"${animeMonth.nameAnime}"** ниже **︾**
                
                • **Доступ к категорий Battle Pass**
                • **Возможность приобретать привилегий**
                • **Доступ к закрытым чатам боевого пропуска**
                • **Эксклюзивные уровневые роли**
                • **Участие в розыгрыше в конце месяца**
                • **Доступ к музыкальному боту**
                • **Возможность взглянуть на дискорд с другой стороны**
            `)
            .setImage('https://c.tenor.com/Hk9OVyhG5FMAAAAd/iguro-obanai-shinazugawa-sanemi.gif')
            .setThumbnail(zeroLevel.receivingGif)
            .setTimestamp()
            .setFooter({ text: Guild.name, iconURL: Guild.iconURL() })
            //.setAuthor(`Сегодня о ${user.username}`, `${message.author.avatarURL()}`)
            .setColor('#2f3136')

        user.send({
            embeds: [
                exampleEmbed,
            ]
        })
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
module.exports.type = 'moderation';