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

    const colors = ["DEFAULT","WHITE","AQUA","GREEN","BLUE","YELLOW","PURPLE","LUMINOUS_VIVID_PINK","FUCHSIA","GOLD","ORANGE","RED","GREY","NAVY","DARK_AQUA","DARK_GREEN","DARK_BLUE","DARK_PURPLE","DARK_VIVID_PINK","DARK_GOLD","DARK_ORANGE","DARK_RED","DARK_GREY","DARKER_GREY","LIGHT_GREY","DARK_NAVY","BLURPLE","GREYPLE","DARK_BUT_NOT_BLACK","NOT_QUITE_BLACK","RANDOM"];
    const roleName = args[0],
        roleColor = args[1];

    let roleDuplicate;

    if (args[0] === undefined || args.length < 2) {
        message.channel.send({
            embeds: [
                {
                    title: `Помошник по командам`,
                    description: `
                        Для изменения личной роли необходимо задать имя и цвет роли (цвет может быть как и в HEX формате #000000 так и просто словом Red)
                       
                        **Пример: 
                        \`?изменитьроль MyBestRole #696969\`
                        или
                        \`?editRole MyAwesomeRole red\`
                        **
                    `,
                    color: '#f7ff00'
                }
            ]
        });
        return;
    }

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

    if (roleColor[0] === '#' && isNaN(parseInt(roleColor.slice(1), 16))) {
        message.channel.send({
            embeds: [
                {
                    title: `Неправильный или несуществующий цвет`,
                    description: 'Неправильный код HEX',
                    color: '#f7ff00'
                }
            ]
        });
        return;
    }
    if(!colors.includes(roleColor.toUpperCase()) && roleColor[0] !== '#') {
        const embed = new MessageEmbed()
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
            .setColor('#f7ff00')

        message.channel.send({ embeds:  [ embed ]});
        return;
    }


    //let guildRole = await message.guild.roles.fetch(User.permissions.private_role.private_role_id)

    //Изменение роли

    message.guild.roles.edit(User.permissions.private_role.private_role_id, {name: roleName, color: roleColor.toUpperCase()})
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

module.exports.names = ['изменитьроль', 'editrole'];
module.exports.type = 'for_all';