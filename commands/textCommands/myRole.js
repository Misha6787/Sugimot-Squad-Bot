const { MessageEmbed } = require("discord.js");

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
    if (User.permissions.private_role.private_role_id) {
        message.channel.send({
            embeds: [
                {
                    title: `У вас уже есть личная роль!`,
                    color: '#ff0000'
                }
            ]
        });
        return;
    }
    if (args[0] === undefined || args.length < 2) {
        message.channel.send({
            embeds: [
                {
                    title: `Помошник по командам`,
                    description: '**s!myRole "Название", "Цвет" **\n или \n**s!личная роль "Название", "Цвет"**',
                    color: '#f7ff00'
                }
            ]
        });
        return;
    }

    // ================================= \\

    const colors = ["DEFAULT","WHITE","AQUA","GREEN","BLUE","YELLOW","PURPLE","LUMINOUS_VIVID_PINK","FUCHSIA","GOLD","ORANGE","RED","GREY","NAVY","DARK_AQUA","DARK_GREEN","DARK_BLUE","DARK_PURPLE","DARK_VIVID_PINK","DARK_GOLD","DARK_ORANGE","DARK_RED","DARK_GREY","DARKER_GREY","LIGHT_GREY","DARK_NAVY","BLURPLE","GREYPLE","DARK_BUT_NOT_BLACK","NOT_QUITE_BLACK","RANDOM"];
    const roleName = args[0],
        roleColor = args[1];

    let defaultRole,
        rolePossiton,
        roleDuplicate;

    message.member.guild.roles.cache.forEach(item => {
        if (item.id === '944542807706718281') {
            defaultRole = item;
        }
        if (item.id === '944504057219940393') {
            rolePossiton = item.position;
        }
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

    if (roleName.length > 12 ) {
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
    await createPersonalRole(message.member.guild.roles, roleColor, roleName, rolePossiton)
        .then((role) => {
            message.channel.send({
                embeds: [
                    {
                        title: `Персональная роль успешно создана)`,
                        description: `Была созданна роль <@&${role.id}> и выдана игроку <@${message.author.id}>`,
                        color: '#4fff29'
                    }
                ]
            })

            User.permissions.private_role.used_command = true;
            User.permissions.private_role.private_role_id = role.id;

            User.save();

            message.member.roles.add(role.id);
        })
        .catch(console.error);

    function createPersonalRole(roleManager, roleColor, name, posittion) {
        return new Promise(async (resolve, reject) => {
            //const _role_premium = roleManager.premiumSubscriberRole;
            const _role = await roleManager.create({
                name: name,
                color: roleColor != "#ffffff" ? roleColor.toUpperCase() : defaultRole.color,
                position: posittion,
                //hoist: defaultRole.hoist
            });
            resolve(_role);
        });
    }
}

module.exports.names = ['личнаяроль', 'myrole'];
module.exports.type = 'for_all';