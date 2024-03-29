const checkLevel = require("../helpers/checkLevel");
const {EmbedBuilder} = require("discord.js");

module.exports = async (bot, message) => {
    // Проверки роли, бота и т.д \\

    if (message.author.bot) return;
    if (message.content.substr(0, 4) === 'http') return

    // ================================= \\

    const User = await bot.User.findOne({id: message.author.id, guildId: message.guildId})

    if (User === null) return;

    let symbols = message.content.replace(/\s+/g, '').length + User.countSymbol

    //await getCurrentLevel(bot, message.author.id, message.guildId)

    if (symbols >= 500) {
        symbols -= 500
        User.money += 10
        User.experience += 75;

        User.countSymbol = symbols;

        User.save();

        await checkLevel(bot, message.author.id, message.guildId, User.experience)

        let channelLog = await bot.channels.fetch('952589168192671844') // 958814476335980644
            .then(channel => channel)
            .catch(console.error)

        let GuildMember = message.guild.members.cache.get(User.id).user

        const exampleEmbed = new EmbedBuilder()
            .setTitle(`Текстовые каналы`)
            .setDescription(`
Участник <@${User.id}> получил койны

Уровень БП: **${User.level_battle_pass}**
Опыт: **${User.experience}**
Деньги: **${User.money}**
                        `)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${GuildMember.id}/${GuildMember.avatar}`)
            .setTimestamp()
            .setColor('#C561D3')

        if (bot.isDev) {
            channelLog.send({ embeds:  [ exampleEmbed ]}).catch(error => {console.log(error)});
        }

    } else {
        User.countSymbol = symbols;
        User.save();
    }
};