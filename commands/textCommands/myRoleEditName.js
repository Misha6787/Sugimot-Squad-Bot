const {MessageEmbed} = require("discord.js");
module.exports = async (bot,message,args,argsF) => {

    // Проверки роли, и проверка на бота и т.д \\
    const User = await bot.User.findOne({id: message.author.id, guildId: message.guildId});

    let ifRoles = 0;
    message.member.roles.cache.forEach(item => {
        if (item.id === '944259753587126333' && User.permissions.private_role.status) {
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
        });
        return;
    }
    if (User.permissions.private_role.private_role_id === '0') {
        message.channel.send({
            embeds: [
                {
                    title: `У вас нету личной роли!`,
                    color: '#ff0000'
                }
            ]
        });
        return;
    }


    // ================================= \\

    let roleName = args.length > 1 ? args.join(' ') : args[0];

    let roleDuplicate;

    if (args[0] === undefined) {
        message.channel.send({
            embeds: [
                {
                    title: `Помошник по командам`,
                    description: `
                        Для изменения личной роли необходимо задать имя
                       
                        **Пример: 
                        \`?имяРоли MyBestRole\`
                        или
                        \`?nameRole MyAwesomeRole\`
                        **
                    `,
                    color: '#f7ff00'
                }
            ]
        });
        return;
    }

    message.member.guild.roles.cache.forEach(item => {
        if (item.name === roleName) {
            roleDuplicate = true;
        }
    })

    if (roleDuplicate) {
        message.channel.send({
            embeds: [
                {
                    title: `Роль с таким именем уже существует`,
                    description: 'Чееееел придумай что-то оригинальное, к примеру **Адепт Гачи, Столп Дискорда, -=$DotaMasterSuperCool228$=-**',
                    color: '#f7ff00'
                }
            ]
        });
        return;
    }

    if (roleName.length > 24 ) {
        message.channel.send({
            embeds: [
                {
                    title: `Слишком длинное название роли!`,
                    color: '#f7ff00'
                }
            ]
        });
        return;
    }


    //let guildRole = await message.guild.roles.fetch(User.permissions.private_role.private_role_id)

    //Изменение роли

    message.guild.roles.edit(User.permissions.private_role.private_role_id, {name: roleName})
        .then(role => {
            message.channel.send({
                embeds: [
                    {
                        title: `Персональная роль успешно изменена!`,
                        description: `Была изменена роль <@&${role.id}> игрока <@${message.author.id}>`,
                        color: '#4fff29'
                    }
                ]
            })
        })
        .catch(console.error);
}

module.exports.names = ['имяроли', 'namerole'];
module.exports.type = 'for_all';