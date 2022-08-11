const { EmbedBuilder } = require("discord.js");

module.exports = async (bot,message,args,argsF) => {

    const Users = await bot.User.find({guildId: message.guildId});
    const Guild = await bot.guilds.fetch(message.guildId);
    function sortByLevel(arr) {
        return arr.sort((a, b) => a.level_battle_pass < b.level_battle_pass ? 1 : -1);
    }

    const sortedUsers = sortByLevel(Users)

    const ratingUsers = sortedUsers.slice(0, 10)

    let fieldsItems = [];

    ratingUsers.forEach((item, index) => {
        fieldsItems.push({
            name: `#${index+1}. ${item.name}`,
            value: `Уровень: ${item.level_battle_pass} | Sugimoto Coins: ${item.money}`,
        })
    })

    let embed = new EmbedBuilder()
        .setTitle('Рейтинг участников')
        .setFields(fieldsItems)
        .setColor(0x9900ff)
        .setThumbnail(Guild.iconURL())
        .setFooter({ text: Guild.name, iconURL: Guild.iconURL() })
        .setTimestamp()

    message.reply({embeds: [embed]})
}

module.exports.names = ['рейтинг', 'реит', 'рейт', 'реитинг', 'rating'];
module.exports.interaction = { //И слэш команда
    name: 'рейтинг', //И название должно быть такое, как у команды
    description: 'Рэйтинг участников нашего сервера!',
    defaultPermission: true //Про слэш команды можно узнать из документации
};
module.exports.type = 'for_all';