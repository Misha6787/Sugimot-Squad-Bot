const { EmbedBuilder } = require("discord.js");

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

    if (User.permissions.private_role.used_command) {
        message.reply({
            embeds: [
                {
                    title: 'У вас уже есть личная роль!',
                    color: 0xff0000
                }
            ]
        });
        return;
    }

    // if (args.length < 3) {
    //     message.reply({
    //         embeds: [
    //             {
    //                 title: 'Помошник по командам',
    //                 description: `
    //                     Для создания личной роли необходимо задать имя и цвет роли (цвет может быть как и в HEX формате #000000 так и просто словом Red)
    //
    //                     **Пример:
    //                     \`?личнаяроль MyBestRole #696969\`
    //                     или
    //                     \`?myRole MyAwesomeRole red\`
    //                     **
    //                 `,
    //                 color: 0xf7ff00
    //             }
    //         ]
    //     });
    //     return;
    // }

    // ================================= \\

    const colors = ["DEFAULT","WHITE","AQUA","GREEN","BLUE","YELLOW","PURPLE","LUMINOUS_VIVID_PINK","FUCHSIA","GOLD","ORANGE","RED","GREY","NAVY","DARK_AQUA","DARK_GREEN","DARK_BLUE","DARK_PURPLE","DARK_VIVID_PINK","DARK_GOLD","DARK_ORANGE","DARK_RED","DARK_GREY","DARKER_GREY","LIGHT_GREY","DARK_NAVY","BLURPLE","GREYPLE","DARK_BUT_NOT_BLACK","NOT_QUITE_BLACK","RANDOM"];
    const roleName = args.name,
        roleColor = args.color;

    let defaultRole,
        rolePosition,
        roleDuplicate;

    message.member.guild.roles.cache.forEach(item => {
        if (item.id === '944542807706718281') {
            defaultRole = item;
        }
        if (item.id === '944504057219940393') {
            rolePosition = item.position;
        }
        if (item.name === roleName) {
            roleDuplicate = true;
        }
    })

    if (roleDuplicate) {
        message.reply({
            embeds: [
                {
                    title: 'Роль с таким именем уже существует',
                    description: 'Чееееел придумай что-то оригинальное, к примеру **Адепт Гачи, Столп Дискорда, -=$DotaMasterSuperCool228$=-**',
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
                    color: 0xf7ff00
                }
            ]
        });
        return;
    }

    if (roleColor[0] === '#' && isNaN(parseInt(roleColor.slice(1), 16))) {
        message.reply({
            embeds: [
                {
                    title: 'Неправильный или несуществующий цвет',
                    description: 'Неправильный код HEX',
                    color: 0xf7ff00
                }
            ]
        });
        return;
    }
    if(!colors.includes(roleColor.toUpperCase()) && roleColor[0] !== '#') {
        const embed = new EmbedBuilder()
            .setTitle('Неправильный или несуществующий цвет')
            .setDescription('Напишите правильное название нужного вам цвета \n можете выбрать из предложенных базовых цветов')
            .addFields([
                {
                    name: '「📓 Цвета #1 」',
                    value: 'Default\nWhite\nAqua\nGreen\nBlue\nYellow\nPurple\nLuminous_vivid_pink\nFuchsia\nGold\nOrange\nRed\nGrey\nNavy\nDark_aqua\nDark_green',
                    inline: true
                },
                {
                    name: '「📓 Цвета #2 」',
                    value: 'Dark_blue\nDark_purple\nDark_vivid_pink\nDark_gold\nDark_orange\nDark_red\nDark_grey\nDarker_grey\nLight_grey\nDark_navy\nBlurple\nGreyple\nDark_but_not_black\nNot_quite_black\nRandom',
                    inline: true
                }
            ])
            .setColor(0xf7ff00)

        message.reply({ embeds:  [ embed ]}).catch(error => console.log(error));
        return;
    }
    function createPersonalRole(roleManager, roleColor, name, position) {
        return new Promise(async (resolve, reject) => {
            //const _role_premium = roleManager.premiumSubscriberRole;
            const _role = await roleManager.create({
                name: name,
                color: roleColor !== "#ffffff" ? roleColor[0].toUpperCase() + roleColor.slice(1) : defaultRole.color,
                position: position,
                //hoist: defaultRole.hoist
            });
            resolve(_role);
        });
    }

    await createPersonalRole(message.member.guild.roles, roleColor, roleName, rolePosition)
        .then((role) => {
            message.reply({
                embeds: [
                    {
                        title: 'Персональная роль успешно создана',
                        description: `Была созданна роль <@&${role.id}> и выдана игроку <@${message.author.id}>`,
                        color: 0x4fff29
                    }
                ]
            }).catch(error => console.log(error))

            User.permissions.private_role.used_command = true;
            User.permissions.private_role.private_role_id = role.id;

            User.save();

            message.member.roles.add(role.id).catch(error => console.log(error));
        })
        .catch(console.error);
}

module.exports.names = ['личнаяроль', 'myrole'];
module.exports.interaction = { //И слэш команда
    name: 'личнаяроль', //И название должно быть такое, как у команды
    description: 'Вы можете создать свою личную роль',
    options: [
        {
            name: 'name',
            description: 'Имя твоей роли (максимум 24 символа)',
            type: 3,
            required: true
        },
        {
            name: 'color',
            description: 'Цвет твоей роли. Например - #000000 или Red',
            type: 3,
            required: true
        }
    ],
    defaultPermission: true //Про слэш команды можно узнать из документации
};
module.exports.type = 'for_all';