
module.exports = async (bot,message,args,argsF) => {
    //const users = await bot.User.find();
    //console.log(users)
    const thisUser = await bot.User.findOne({id: message.author.id, guildId: message.guildId});

    thisUser.money = 100;

    thisUser.save()

    console.log(thisUser)
}

module.exports.names = ['инфа'];
