module.exports = bot => {
    bot
        .on('ready', () => require("./ready")(bot))
        .on('messageCreate', (message) => {
            if (message.author.bot) return;
            require("./messageCreate")(bot, message)
        })
        .on('messageCreate', (message) => {
            if (message.author.bot) return;
            require("../commands/backgroundEvents/textToMoneyAndExperience")(bot, message)
        })
        .on('messageCreate', (message) => {
            if (message.author.bot) return;
            require("../commands/backgroundEvents/addInfoToBD")(bot, message)
        })
        .on('voiceStateUpdate', (oldState, newState) => {
            require("../commands/backgroundEvents/voiceToЕxperienceAndMoney")(oldState, newState, bot)
        })
}