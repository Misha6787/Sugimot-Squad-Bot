module.exports = async (bot,message,args,argsF) => {
    let ifRoles = 0;
    message.member.roles.cache.forEach(item => {
        if (item.id === '944259753587126333') {
            ifRoles++
        }
    })
    if (ifRoles === 0) return;
    if (message.content.substr(0, 4) === 'http') return
    let memberSymbols = bot.Memory.guilds[message.guildId].members[message.author.id].countSymbol
    let symbols = message.content.replace(/\s+/g, '').length + memberSymbols
    if (symbols >= 500) {
        symbols -= 500
        bot.Memory.guilds[message.guildId].members[message.author.id].money += 10
    }
    bot.Memory.guilds[message.guildId].members[message.author.id].countSymbol = symbols
    //console.log(bot.Memory.guilds[message.guildId].members[message.author.id].countSymbol)
    bot.Memory.save();
}