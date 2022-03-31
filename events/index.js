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
            require("../commands/backgroundEvents/addWriteNewMember")(bot, message)
        })
        .on('interactionCreate', async (interaction) => {
            await require("../commands/interactionCommands/selectedMenu")(bot, interaction)
        })
        .on('guildMemberAdd', async (newMember) => {
            await require("../commands/backgroundEvents/addWentNewMember")(bot, newMember)
        })
        .on('voiceStateUpdate', (oldState, newState) => {
            require("../commands/backgroundEvents/voiceToЕxperienceAndMoney")(bot, oldState, newState)
        })
}