module.exports = bot => {
    bot
        .on('ready', () => require("./ready")(bot))
        .on('messageCreate', (message) => {
            if (message.author.bot) return;
            require("./messageCreate")(bot, message)
        })
        .on('messageCreate', (message) => {
            if (message.author.bot) return;
            require("../commands/backgroundEvents/textToMoney")(bot, message)
        })
        .on('messageCreate', (message) => {
            if (message.author.bot) return;
            require("../commands/backgroundEvents/addInfoToBD")(bot, message)
        })
        .on('voiceStateUpdate', (oldState, newState) => {
            require("../commands/voiceCommands/voiceЕxperience")(oldState, newState, bot)
        })
}