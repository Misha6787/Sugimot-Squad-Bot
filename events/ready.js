module.exports = async (bot) => {

    bot.user.setPresence({
        activities: [
            {
                name: `| ?помощь |`,
                type: 2
            }
        ]
    })
    //console.log(bot.memory)

    console.log(bot.user.username + ' Готов!');
}