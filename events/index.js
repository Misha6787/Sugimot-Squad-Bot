module.exports = bot => {
    bot
        .on('ready', () => require("./ready")(bot))
        .on('guildMemberAdd', async (newMember) => {
            await require("../commands/backgroundEvents/addWentNewMember")(bot, newMember)
        })
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
            require("../commands/backgroundEvents/addWriteNewMember")(bot, message)
        })
        .on('voiceStateUpdate', (oldState, newState) => {
            require("../commands/backgroundEvents/voiceToЕxperienceAndMoney")(bot, oldState, newState)
        })
}