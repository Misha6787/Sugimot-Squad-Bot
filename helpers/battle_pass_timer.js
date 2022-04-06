const battlePassTimer = async (bot, deadline) => {

    let guild = await bot.guilds.fetch('777301995803377704');

    let channel = await guild.channels.fetch('956999770910634065');

    let message = await channel.messages.fetch('956999918449475624');

    const oneDay = 1000 * 60 * 60 * 24;

    // обновление времени
    const getTimeRemaining = () => {
        let dateStop = new Date(deadline).getTime();
        let dateNow = new Date().getTime();
        let timeRemaining = Math.max((dateStop - dateNow), 0);

        let days = Math.round(timeRemaining / oneDay);
        let hours = Math.floor((timeRemaining / 1000 / 60 / 60) % 24);
        let minutes = Math.floor((timeRemaining / 1000 / 60) % 60);

        return { timeRemaining, days, hours, minutes };
    };

    // обновление времени в канале
    const updateMessage = async () => {
        let getTime = getTimeRemaining(),
            days = getTime.days,
            hours = getTime.hours,
            minutes = getTime.minutes;

        // склонение дней, часов и минут
        let declinationDay = days + ' ' + ((days === 1 || (days > 19 && days % 10 === 1)) ? 'день' :
            ((days > 1 && days < 5) || (days > 19 && days % 10 > 1 && days % 10 < 5)) ? 'дня' : 'дней');

        let declinationHours = hours + ' ' + ((hours === 1 || (hours > 19 && hours % 10 === 1)) ? 'час' :
            ((hours > 1 && hours < 5) || (hours > 19 && hours % 10 > 1 && hours % 10 < 5)) ? 'часа' : 'часов');

        let declinationMinute = minutes + ' ' + ((minutes === 1 || (minutes > 19 && minutes % 10 === 1)) ? 'минута' :
            ((minutes > 1 && minutes < 5) || (minutes > 19 && minutes % 10 > 1 && minutes % 10 < 5)) ? 'минут' : 'минут');

        await message.edit({
            embeds: [
                {
                    title: `До конца Battle Pass ${declinationDay} ${declinationHours} и ${declinationMinute}`,
                    color: "RANDOM"
                }
            ]
        });

        return getTime;
    }

    // обновление времени таймера БП
    const updateClock = setInterval(async () => {
        let getTime = await updateMessage();

        if (!getTime.timeRemaining) {
            clearInterval(updateClock);
        }
    }, 1000*60);

    await updateMessage()

    // время привелегий
    // setInterval(async () => {
    //     const User = await bot.User.find({guildId: message.guildId});
    //     User.forEach(item => {
    //         if (new Date(item.permissions.mute_members.date) <= new Date()) {
    //             const member = guild.members.cache.get(User.id)
    //             item.permissions.mute_members.status = false;
    //             item.permissions.mute_members.date = 0;
    //             member.roles.remove('960895927109943306');
    //         } else if (new Date(item.permissions.move_members.date) <= new Date()) {
    //             const member = guild.members.cache.get(User.id)
    //             item.permissions.move_members.status = false;
    //             item.permissions.move_members.date = 0;
    //             member.roles.remove('960895931065200720');
    //         }
    //     })
    // }, 1000*60*60);
}

module.exports = battlePassTimer