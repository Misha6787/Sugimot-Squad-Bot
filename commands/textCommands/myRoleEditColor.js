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
    ifRoles++;
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
                    title: 'У вас недостаточно прав!',
                    color: 0xff0000
                }
            ]
        });
        return;
    }


    // ================================= \\

    const colors = ["DEFAULT","WHITE","AQUA","GREEN","BLUE","YELLOW","PURPLE","LUMINOUS_VIVID_PINK","FUCHSIA","GOLD","ORANGE","RED","GREY","NAVY","DARK_AQUA","DARK_GREEN","DARK_BLUE","DARK_PURPLE","DARK_VIVID_PINK","DARK_GOLD","DARK_ORANGE","DARK_RED","DARK_GREY","DARKER_GREY","LIGHT_GREY","DARK_NAVY","BLURPLE","GREYPLE","DARK_BUT_NOT_BLACK","NOT_QUITE_BLACK","RANDOM"];
    const roleColor = args.color;

    // if (args.color === undefined) {
    //     message.channel.send({
    //         embeds: [
    //             {
    //                 title: 'Помошник по командам',
    //                 description: `
    //                     Для изменения личной роли необходимо задать цвет роли (цвет может быть как и в HEX формате #000000 так и просто словом Red)
    //
    //                     **Пример:
    //                     \`?цветРоли #696969\`
    //                     или
    //                     \`?colorRole red\`
    //                     **
    //                 `,
    //                 color: '#f7ff00'
    //             }
    //         ]
    //     });
    //     return;
    // }
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
            .setFields(
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
            )
            .setColor(0xf7ff00)

        message.reply({ embeds:  [ embed ]}).catch(error => console.log(error));
        return;
    }


    //let guildRole = await message.guild.roles.fetch(User.permissions.private_role.private_role_id)

    //Изменение роли

    message.guild.roles.edit(User.permissions.private_role.private_role_id, {color: roleColor[0].toUpperCase() + roleColor.slice(1)})
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

module.exports.names = ['цветроли', 'colorrole'];
module.exports.interaction = { //И слэш команда
    name: 'цветроли', //И название должно быть такое, как у команды
    description: 'Ты можете изменить цвет своей роли',
    options: [
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