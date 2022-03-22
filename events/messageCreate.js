module.exports = async (bot, message) => {
    if (message.author.bot) return;

    const {content, author, guild} = message;

    // const User = await bot.Users.findOne({id: author.id})
    // console.log(User)
    // if (User == null) {
    //     const newUser = new bot.Users({
    //         id: author.id,
    //         username: author.username
    //     })
    //     newUser.save()
    // }

    const Guild = await bot.Guild.findOne({id: message.guildId});

    if (content.substr(0, Guild.prefix.length) !== Guild.prefix) return;

    const
        messageArray = content.slice(Guild.prefix.length).split(' '),
        command = messageArray[0].toLowerCase(),
        args = messageArray.slice(1),
        messageArrayFull = content.split(' '),
        argsF = messageArrayFull.slice(1),
        commandRun = bot.commands.get(command);

    if (commandRun) commandRun(bot,message,args,argsF)
        //.then(any => console.log(any))
        .catch(err => console.error(err))

}