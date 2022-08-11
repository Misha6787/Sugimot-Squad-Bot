const {EmbedBuilder} = require("discord.js");
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
        message.reply({
            embeds: [
                {
                    title: 'У вас недостаточно прав!',
                    color: 0xff0000
                }
            ]
        });
        return;
    }
    if (User.permissions.private_role.private_role_id === '0') {
        message.reply({
            embeds: [
                {
                    title: 'У вас нету личной роли!',
                    color: 0xff0000
                }
            ]
        });
        return;
    }


    // ================================= \\

    let roleName = args.name;

    let roleDuplicate;

    // if (args.name === undefined) {
    //     message.reply({
    //         embeds: [
    //             {
    //                 title: 'Помошник по командам',
    //                 description: `
    //                     Для изменения личной роли необходимо задать имя
    //
    //                     **Пример:
    //                     \`?имяРоли MyBestRole\`
    //                     или
    //                     \`?nameRole MyAwesomeRole\`
    //                     **
    //                 `,
    //                 color: 0xf7ff00
    //             }
    //         ]
    //     });
    //     return;
    // }

    message.member.guild.roles.cache.forEach(item => {
        if (item.name === roleName) {
            roleDuplicate = true;
        }
    })

    if (roleDuplicate) {
        message.reply({
            embeds: [
                {
                    title: 'Роль с таким именем уже существует',
                    description: 'Чееееел придумай что-то оригинальное, к примеру **Адепт Гачи, Столп Дискорда, -=$PussyEater$=-**',
                    color: 0xf7ff00
                }
            ]
        });
        return;
    }

    if (roleName.length > 24 ) {
        message.reply({
            embeds: [
                {
                    title: 'Слишком длинное название роли!',
                    color: 0xf7ff000
                }
            ]
        });
        return;
    }


    //let guildRole = await message.guild.roles.fetch(User.permissions.private_role.private_role_id)

    //Изменение роли

    message.guild.roles.edit(User.permissions.private_role.private_role_id, {name: roleName})
        .then(role => {
            message.reply({
                embeds: [
                    {
                        title: 'Персональная роль успешно изменена!',
                        description: `Была изменена роль <@&${role.id}> игрока <@${message.author.id}>`,
                        color: 0x4fff29
                    }
                ]
            })
        }).catch(error => console.log(error));
}

module.exports.names = ['имяроли', 'namerole'];
module.exports.interaction = { //И слэш команда
    name: 'имяроли', //И название должно быть такое, как у команды
    description: 'Ты можете изменить имя своей роли',
    options: [
        {
            name: 'name',
            description: 'Имя твоей роли (максимум 24 символа)',
            type: 3,
            required: true
        }
    ],
    defaultPermission: true //Про слэш команды можно узнать из документации
};
module.exports.type = 'for_all';