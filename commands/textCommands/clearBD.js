const { EmbedBuilder } = require("discord.js");

module.exports = async (bot,message,args,argsF) => {

    // Проверки роли, и проверка на бота и т.д \\

    let ifRoles = 0;
    message.member.roles.cache.forEach(item => {
        if (item.id === '777304566844751902' ||
            item.id === '777304185380274206' ) {
            ifRoles++
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
        })
        return;
    }

    // ======================================= \\

    const User = await bot.User.find({guildId: message.guildId});

    const battle_pass_anime = await bot.AnimeMonth;

    const battle_pass_anime_names =  []

    for (let item in battle_pass_anime.level) {
        if (item >= 0) {
            battle_pass_anime_names.push(`${item} | ${battle_pass_anime.level[item].nameRole}`)
        }
    }

    User.forEach(async (item) => {
        // item.experience = 0;
        // item.money = 0;
        // item.countSymbol = 0;
        // item.level_battle_pass = 0;
        // item.voiceInterval = 0;
        // item.permissions.create_private_room = false;

        let member = message.guild.members.cache.get(item.id)

        // if (item.permissions.mute_members.status) {
        //     item.permissions.mute_members.status = false;
        //     item.permissions.mute_members.date = 0;
        //     await member.roles.remove('960895927109943306');
        // }
        // if (item.permissions.move_members.status) {
        //     item.permissions.move_members.status = false;
        //     item.permissions.move_members.date = 0;
        //     await member.roles.remove('960895931065200720');
        // }
        // if (item.permissions.private_role.private_role_id !== '0') {
        //     await member.roles.remove(item.permissions.private_role.private_role_id);
        // }

        member.roles.cache.forEach(async (item) => {
            if (battle_pass_anime_names.includes(item.name)) {
                await member.roles.remove(item.id)
            }
        })

        item.save();
    })

    const exampleEmbed = new EmbedBuilder()
        .setTitle('Действие успешно выполнено!')
        .setDescription('База очищена, роли у участников убраны)')
        .setImage('https://i.imgur.com/XKSFDmC.jpg')
        .setColor(0xff0000)

    message.reply({ embeds:  [ exampleEmbed ]});


}

module.exports.names = ['очиститьбазу', 'clearbd', 'судныйдень'];
module.exports.interaction = { //И слэш команда
    name: 'очиститьбазу', //И название должно быть такое, как у команды
    description: 'Это только для админов)',
    defaultPermission: 0 //Про слэш команды можно узнать из документации
};
module.exports.type = 'moderation';