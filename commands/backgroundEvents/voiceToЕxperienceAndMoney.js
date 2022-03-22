const checkLevel = require("../../helpers/checkLevel");
let timer;

module.exports = async (oldState, newState, bot) => {
    let ifRoles = 0;
    newState.member.roles.cache.forEach(item => item.id === '944259753587126333' ? ifRoles++ : '')
    if (ifRoles === 0) return;

    //console.log(bot.Memory.guilds[newState.guild.id].members[newState.id].inVoiceChannel)

    const User = await bot.User.findOne({id: newState.id, guildId: newState.guild.id});

    if (User.inVoiceChannel) {
        User.inVoiceChannel = false;
        //console.log('quit')
        clearInterval(timer)
    } else {
        User.inVoiceChannel = true;
        //console.log('open')
        timer = setInterval(async () => {
            User.money += 1;
            User.experience += 10;

            await checkLevel(bot, newState.id, newState.guild.id)

            User.save();
            // console.log('coins +1')
        }, 1000 * 60);
    }

    User.save();
}