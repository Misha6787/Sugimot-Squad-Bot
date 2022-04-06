const {MessageEmbed} = require("discord.js");
module.exports = async (bot, interaction) => {

    // Проверки роли, и проверка на бота и т.д \\

    let ifRoles = 0;
    interaction.member.roles.cache.forEach(item => {
        if (item.id === '777304566844751902' ||
            item.id === '777304185380274206' ||
            item.id === '944259753587126333') {
            ifRoles++
        }
    })
    if (ifRoles === 0) {
        interaction.reply({
            embeds: [
                {
                    title: `У вас нету Battle Pass Sugimoto Squad`,
                    color: '#ff0000'
                }
            ],
            ephemeral: true
        });
        return;
    }

    // ======================================= \\

    const User = await bot.User.findOne({id: interaction.user.id, guildId: interaction.guild.id});
    const Permissions_bp = await bot.Permissions_battle_pass.findOne({name: interaction.values[0]});

    let isNotMoney = false;
    const permissionStatus = User.permissions[interaction.values[0]].status ? User.permissions[interaction.values[0]].status : User.permissions[interaction.values[0]]
    let permissionBuy = false;

    const days = 2;
    const today = new Date()
    const dayClose = new Date(today)
    dayClose.setDate(dayClose.getDate() + days)

    switch (interaction.values[0]) {
        case 'mute_members':

            // interaction.member.roles.cache.forEach(item => {
            //     if (item.id === '960895927109943306') {
            //         isBuyRole = true;
            //     }
            // })

            if (User.money >= Permissions_bp.options.price) {
                User.money -= Permissions_bp.options.price;

                User.permissions[interaction.values[0]].status = true;
                User.permissions[interaction.values[0]].date = dayClose;
                interaction.member.roles.add('960895927109943306');

                // setTimeout(() => {
                //     interaction.member.roles.remove('960895927109943306')
                // }, timeToClose)

            } else {
                isNotMoney = true;
            }
            break
        case 'move_members':

            if (User.money >= Permissions_bp.options.price) {
                User.money -= Permissions_bp.options.price;
                User.permissions[interaction.values[0]].status = true;
                User.permissions[interaction.values[0]].date = dayClose;
                interaction.member.roles.add('960895931065200720');
            } else {
                isNotMoney = true;
            }
            break
        case 'private_role':
            if (permissionStatus === true) permissionBuy = true
            if (User.money >= Permissions_bp.options.price) {
                User.money -= Permissions_bp.options.price;
                User.permissions[interaction.values[0]].status = true;
            } else {
                isNotMoney = true;
            }
            break
        case 'upgrade_private_role':
        case 'create_private_room':
            if (permissionStatus === true) permissionBuy = true;
            if (User.money >= Permissions_bp.options.price) {
                User.money -= Permissions_bp.options.price;
                User.permissions[interaction.values[0]] = true;
            } else {
                isNotMoney = true;
            }
            break
    }

    User.save();

    if (isNotMoney || permissionBuy) {
        const notMoneyEmbed = new MessageEmbed()
            .setTitle('Извините, вы не смогли получить эту привилегию')
            .setDescription('У вас не хватает койнов для этой привилегий или это привилегия уже приобритена')
            .setColor('RED')


        interaction.reply({
            embeds: [notMoneyEmbed],
            ephemeral: true
        });
    } else {
        if (interaction.isSelectMenu() && interaction.customId === "select") {
            const emded = new MessageEmbed()
                .setTitle('Поздравляю с приобритением привелегий!')
                .setDescription('Приятного времяпривождения в Sugimoto Squad!')
                .setImage('https://c.tenor.com/r0ViAtLLeKAAAAAC/muichiro-hihih.gif')
                .setColor('GREEN')
                .setTimestamp()
            interaction.reply({
                embeds: [emded],
                ephemeral: true
            });
        }
    }
}