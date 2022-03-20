let timer;
module.exports = (oldState, newState, bot) => {
    let ifRoles = 0;
    newState.member.roles.cache.forEach(item => {
        if (item.id === '944259753587126333') {
            ifRoles++;
        }
    })
    if (ifRoles === 0) return;

    //console.log(bot.Memory.guilds[newState.guild.id].members[newState.id].inVoiceChannel)

    if (bot.Memory.guilds[newState.guild.id].members[newState.id].inVoiceChannel) {
        bot.Memory.guilds[newState.guild.id].members[newState.id].inVoiceChannel = false;
        //console.log('quit')
        clearInterval(timer)
    } else {
        bot.Memory.guilds[newState.guild.id].members[newState.id].inVoiceChannel = true;
        //console.log('open')
        timer = setInterval(() => {
            bot.Memory.guilds[newState.guild.id].members[newState.id].money += 1;
            bot.Memory.save();
            // console.log('coins +1')
        }, 1000 * 60);
    }

    bot.Memory.save();
}