
module.exports = async (bot,message,args,argsF) => {

    const User = await bot.User.findOne({id: message.author.id, guildId: message.guildId});
    const levelUser = User.level_battle_pass;
    const battle_pass_anime = await bot.AnimeMonth;

    console.log(message.channel)
    console.log(bot)
}

module.exports.names = ['инфа'];
