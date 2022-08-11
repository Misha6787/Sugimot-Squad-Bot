const {EmbedBuilder} = require("discord.js");
module.exports = async (bot, interaction) => {
    // Проверки роли, бота и т.д \\

    if (interaction.values === undefined) return;

    let ifRoles = 0;
    interaction.member.roles.cache.forEach(item => {
        if (item.id === '777304566844751902' ||
            item.id === '777304185380274206' ||
            item.id === '944259753587126333') {
            ifRoles++
        }
    })

    ifRoles++

    if (ifRoles === 0) {
        interaction.reply({
            embeds: [
                {
                    title: `У вас нету Battle Pass Sugimoto Squad`,
                    color: 0xff0000
                }
            ],
            ephemeral: true
        });
        return;
    }

    // ======================================= \\

    //console.log(interaction)

    const User = await bot.User.findOne({id: interaction.user.id, guildId: interaction.guild.id});
    const Permissions_bp = await bot.Permissions_battle_pass.findOne({name: interaction.values[0]});
    const permissionStatus = User.permissions[interaction.values[0]].status ? User.permissions[interaction.values[0]].status : User.permissions[interaction.values[0]].status;

    const days = 2;
    const dayClose = User.permissions[interaction.values[0]].date <= new Date() ? new Date() : User.permissions[interaction.values[0]].date;
    if (dayClose) {
        dayClose.setDate(dayClose.getDate() + days);
    }


    // Получение голосовой комнаты для создания приватной комнаты
    let guild = await bot.guilds.fetch(interaction.guildId);
    let channel = await guild.channels.fetch('952589168767295523') // 961719339080376412

    let isNotMoneyOrBuyPermission = false;
    let embed;

    // Проверка на то есть ли деньги на привилегию или куплена ли эта привилегия вовсе (исключение мут и перемещение игроков ее можно продлить обновив таймер)
    if ((User.money >= Permissions_bp.options.price && !permissionStatus) ||
        (User.money >= Permissions_bp.options.price && interaction.values[0] === 'mute_members') ||
        (User.money >= Permissions_bp.options.price && interaction.values[0] === 'move_members')) {

        User.money -= Permissions_bp.options.price;
        User.permissions[interaction.values[0]].status = true;

        switch (interaction.values[0]) {
            case 'mute_members':

                User.permissions[interaction.values[0]].date = 0;
                User.permissions[interaction.values[0]].date = dayClose;
                await interaction.member.roles.add('1002203579853066240'); // 960895927109943306

                break;
            case 'move_members':

                User.permissions[interaction.values[0]].date = 0;
                User.permissions[interaction.values[0]].date = dayClose;
                await interaction.member.roles.add('1002203886817398814'); // 960895931065200720

                break;
            case 'private_role':

                embed = new EmbedBuilder()
                    .setTitle('Поздравляю с приобретением привилегий!')
                    .setDescription('Что-бы сделать себе личную роль нужно прописать эту команду - **?личнаяроль "Название" "Цвет"**')
                    .setImage('https://c.tenor.com/r0ViAtLLeKAAAAAC/muichiro-hihih.gif')
                    .setColor(0x00FF00)
                    .setTimestamp()

                break;
            case 'upgrade_private_role':
                // Изменение (улучшение) роли, с помощью выведения этой роли в список участников отдельно от других
                let guildRole = await interaction.guild.roles.fetch(User.permissions.private_role.private_role_id)

                User.permissions[interaction.values[0]] = true;
                guildRole.setHoist(true)
                    .catch(console.error);

                embed = new EmbedBuilder()
                    .setTitle('Поздравляю с приобретением привилегий!')
                    .setDescription('Теперь ваша роль выше остальных')
                    .setImage('https://c.tenor.com/r0ViAtLLeKAAAAAC/muichiro-hihih.gif')
                    .setColor(0x00FF00)
                    .setTimestamp()

                break;
            case 'create_private_room':
                User.permissions[interaction.values[0]] = true;
                embed = new EmbedBuilder()
                    .setTitle('Поздравляю с приобретением привилегий!')
                    .setDescription('Вы получиили доступ к голосовому каналу <#961719339080376412>!')
                    .setImage('https://c.tenor.com/r0ViAtLLeKAAAAAC/muichiro-hihih.gif')
                    .setColor(0x00FF00)
                    .setTimestamp()
                // Выдача доступа к голосовой комнате
                await channel.permissionOverwrites.edit(User.id, { CONNECT: true });

                break;
        }
        User.save();
    } else {
        isNotMoneyOrBuyPermission = true;
    }

    if (isNotMoneyOrBuyPermission) {
        embed = new EmbedBuilder()
            .setTitle('Извините, вы не смогли получить эту привилегию')
            .setDescription('У вас не хватает койнов для этой привилегий или это привилегия уже приобритена')
            .setColor(0xff0000)

    } else if (interaction.isSelectMenu() && interaction.customId === "select") {
        embed = embed ? embed : new EmbedBuilder()
            .setTitle('Поздравляю с приобритением привелегий!')
            .setDescription('Приятного времяпривождения в Sugimoto Squad!')
            .setImage('https://c.tenor.com/r0ViAtLLeKAAAAAC/muichiro-hihih.gif')
            .setColor(0x00FF00)
            .setTimestamp()
    }

    interaction.reply({
        embeds: [embed],
        ephemeral: true
    });
}