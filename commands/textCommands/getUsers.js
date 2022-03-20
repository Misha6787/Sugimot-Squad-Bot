
module.exports = async (bot,message,args,argsF) => {
    const notes = await bot.User.find();
    console.log(notes)
}

module.exports.names = ['юзеры'];
