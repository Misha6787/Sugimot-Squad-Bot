const { MessageEmbed } = require("discord.js");

const battlePassTimer = async (bot, deadline) => {

    let server = await bot.guilds.fetch('777301995803377704');

    let channel = await server.channels.fetch('956999770910634065');

    let message = await channel.messages.fetch('956999918449475624');

    const oneDay = 1000 * 60 * 60 * 24;

    // обновление времени
    const getTimeRemaining = () => {
        let dateStop = new Date(deadline).getTime();
        let dateNow = new Date().getTime();
        let timeRemaining = Math.max((dateStop - dateNow), 0);

        let days = Math.round(timeRemaining / oneDay);

        return { timeRemaining, days };
    };

    // обновление времени в канале
    const updateMessage = async () => {
        let getTime = getTimeRemaining();

        await message.edit({
            embeds: [
                {
                    title: `До конца Battle Pass ${getTime.days} дней`,
                    color: "RANDOM"
                }
            ]
        });

        return getTime;
    }

    // обновление времени
    const updateClock = setInterval(async () => {
        const getTime = await updateMessage();

        if (!getTime.timeRemaining) {
            clearInterval(updateClock);
        }
    }, 1000*60);

    await updateMessage()
}

module.exports = battlePassTimer