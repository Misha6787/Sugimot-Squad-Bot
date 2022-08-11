const checkLevel = require("../helpers/checkLevel");
const {EmbedBuilder} = require("discord.js");

module.exports = async (bot, oldState, newState) => {
    // Проверки роли, бота и т.д \\

    let member = await bot.users.fetch(newState.id)
        .then(user => user)
        .catch(console.error)
    if (member.bot) return;

    // ================================= \\

    const User = await bot.User.findOne({id: newState.id, guildId: newState.guild.id});

    if (User === null) return;

    let channelLog = await bot.channels.fetch('952589168192671844') // 958814476335980644
        .then(channel => channel)
        .catch(console.error)

    let GuildMember = newState.guild.members.cache.get(User.id) ? newState.guild.members.cache.get(User.id).user : oldState.guild.members.cache.get(User.id).user

    if (!oldState.channel && newState.channel) {
        const openEmbed = new EmbedBuilder()
            .setTitle(`Голосовые каналы`)
            .setDescription(`
Вошел в канал <#${newState.channel.id}>: <@${User.id}>

Уровень БП: **${User.level_battle_pass}**
Опыт: **${User.experience}**
Деньги: **${User.money}**
                        `)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${GuildMember.id}/${GuildMember.avatar}`)
            .setTimestamp()
            .setColor('#C561D3')

        channelLog.send({ embeds:  [ openEmbed ]}).catch(error => {console.log(error)});

        User.voiceInterval = setInterval(async () => {
            User.money += 1;
            User.experience += 5;

            User.save();

            await checkLevel(bot, newState.id, newState.guild.id, User.experience)

            const exampleEmbed = new EmbedBuilder()
                .setTitle(`Голосовые каналы`)
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
        }, 1000 * 60);

    } else if (!newState.channel) {
        const exampleEmbed = new EmbedBuilder()
            .setTitle(`Голосовые чаты`)
            .setDescription(`
Вышел из канала <#${oldState.channel.id}>: <@${User.id}>

Уровень БП: **${User.level_battle_pass}**
Опыт: **${User.experience}**
Деньги: **${User.money}**
                        `)
            .setThumbnail(`https://cdn.discordapp.com/avatars/${GuildMember.id}/${GuildMember.avatar}`)
            .setTimestamp()
            .setColor('#C561D3')

        channelLog.send({ embeds:  [ exampleEmbed ]}).catch(error => {console.log(error)});
        await clearInterval(User.voiceInterval)
    }
    User.save();
};