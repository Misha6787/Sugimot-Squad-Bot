const { MessageEmbed } = require("discord.js");
const getCurrentLevel = require("./getCurrentLevel");

const checkLevel = async (bot, userId, guildId, UserExperience) => {
    const User = await bot.User.findOne({id: userId, guildId: guildId});
    let UserLevel = User.level_battle_pass;

    let limitsExperience = 1000 + 100 * UserLevel;

    if (UserExperience >= limitsExperience) {
        UserExperience -= limitsExperience;
        User.level_battle_pass++;
        User.experience = UserExperience;

        User.save();

        if (User.level_battle_pass % 10 === 0) {

            const elementLevel = (await getCurrentLevel(bot, User.level_battle_pass)).element;

            let gif = elementLevel.receivingGif ? elementLevel.receivingGif : 'https://i.imgur.com/eHX2Nbc.png';

            let member = await bot.users.fetch(userId)
                .then(user => user)
                .catch(console.error)

            // let channelFlood = await bot.channels.fetch('777512811466981376')
            //     .then(channel => channel)
            //     .catch(console.error)
            let channelLog = await bot.channels.fetch('958814476335980644')
                .then(channel => channel)
                .catch(console.error)

            const exampleEmbed = new MessageEmbed()
                .setTitle(`${User.name} поднял(а) уровень!`)
                .setDescription(`
                    Поздравляем! Теперь твой уровень - **${User.level_battle_pass}**
                `)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}`)
                .setAuthor(`Сегодня о ${User.name}`, `https://cdn.discordapp.com/avatars/${member.id}/${member.avatar}`)
                .setImage(`${gif}`)
                .setColor('RANDOM')

            member.send({ embeds:  [ exampleEmbed ]});
            //channelFlood.send({ embeds:  [ exampleEmbed ]});
            channelLog.send({ embeds:  [ exampleEmbed ]});
        }
    }
    //User.save();
}

module.exports = checkLevel;