const { MessageEmbed } = require('discord.js');

module.exports = async (bot,message,args,argsF) => {

    const Users = await bot.User.find({guildId: message.guildId});
    const Guild = await bot.guilds.fetch(message.guildId);
    function sortByAge(arr) {
        return arr.sort((a, b) => a.level_battle_pass < b.level_battle_pass ? 1 : -1);
    }

    const sortedUsers = sortByAge(Users)

    const ratingUsers = sortedUsers.slice(0, 10)

    let fieldsItems = [];

    ratingUsers.forEach((item, index) => {
        fieldsItems.push({
            name: `#${index+1}. ${item.name}`,
            value: `Уровень: ${item.level_battle_pass} | Sugimoto Coins: ${item.money}`,
        })
    })

    let embed = new MessageEmbed()
        .setTitle('Рейтинг участников')
        .setFields(fieldsItems)
        .setColor("RANDOM")
        .setThumbnail(Guild.iconURL())
        .setFooter({ text: Guild.name, iconURL: Guild.iconURL() })
        .setTimestamp()

    message.channel.send({embeds: [embed]})
}

module.exports.names = ['рейт', 'реит', 'рейтинг', 'реитинг', 'rating'];
module.exports.type = 'for_all';