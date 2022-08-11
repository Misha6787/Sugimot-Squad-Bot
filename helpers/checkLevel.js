const { EmbedBuilder } = require("discord.js");
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

        if (User.level_battle_pass % 10 === 0 && User.level_battle_pass <= 100) {

            const battlePassLevel = await getCurrentLevel(bot, User.level_battle_pass);

            const elementLevel = battlePassLevel.element;

            const previousLevel = User.level_battle_pass > 0 ? User.level_battle_pass - (User.level_battle_pass % 10) - 1 : User.level_battle_pass;

            const previousBattlePassLevel = await getCurrentLevel(bot, previousLevel);

            const elementRole = battlePassLevel.element.nameRole;

            const previousElementRole = previousBattlePassLevel.element.nameRole;

            let nextLevelRole,
                previousLevelRole;

            let gif = elementLevel.receivingGif ? elementLevel.receivingGif : 'https://i.imgur.com/eHX2Nbc.png';

            const thisGuild = await bot.guilds.fetch(guildId);
            const member = await thisGuild.members.fetch(User.id)

            member.guild.roles.cache.forEach(item => {
                if (battlePassLevel.level === 0) {
                    if (item.name === `${battlePassLevel.level} | ${elementRole}`) {
                        nextLevelRole = item;
                        previousLevelRole = item;
                    }
                } else {
                    if (item.name === `${battlePassLevel.level} | ${elementRole}`) {
                        nextLevelRole = item;
                    } else if (item.name === `${previousBattlePassLevel.level} | ${previousElementRole}`) {
                        previousLevelRole = item;
                    }
                }
            })

            if (previousLevelRole) {
                await member.roles.remove(previousLevelRole.id)
                    .catch(error => console.log(error));
            }
            await member.roles.add(nextLevelRole.id)
                .catch(error => console.log(error));

            // let channelFlood = await bot.channels.fetch('777512811466981376')
            //     .then(channel => channel)
            //     .catch(console.error)
            let channelLog = await bot.channels.fetch('952589168192671844') // 958814476335980644
                .then(channel => channel)
                .catch(console.error)

            const exampleEmbed = new EmbedBuilder()
                .setTitle(`${User.name} поднял(а) уровень!`)
                .setDescription(`
                    Поздравляем! Теперь твой уровень - **${User.level_battle_pass}**
                `)
                .setThumbnail(`https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}`)
                .setAuthor(`Сегодня о ${member.nickname}`, `https://cdn.discordapp.com/avatars/${member.user.id}/${member.user.avatar}`)
                .setImage(`${gif}`)
                .setColor('RANDOM')

            await member.send({ embeds:  [ exampleEmbed ]}).catch(error => {console.log(error)});
            //channelFlood.send({ embeds:  [ exampleEmbed ]});

            channelLog.send({ embeds:  [ exampleEmbed ]}).catch(error => {console.log(error)});

        }
    }
    //User.save();
}

module.exports = checkLevel;