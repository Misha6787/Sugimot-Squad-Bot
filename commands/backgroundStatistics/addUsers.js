//const messageSchema = require('./schema/messageSchema')

module.exports = async (bot, message, args, argsF) => {
    // let DBuser = await bot.messageSchema.findById(message.guild.id)
    // const user = message.author;
    // if (user.bot) return;
    // if (!DBuser) await bot.messageSchema.findByIdAndUpdate(message.guild.id, {userId: user.id}, {new: true, upsert: true, setDefaultsOnInsert: true})
    // else {
    //     await bot.messageSchema.findByIdAndUpdate(message.guild.id, {$inc: {
    //         message: 1
    //         }},{new: true, upsert: true})
    //     console.log('+1')
    // }



    const User = await bot.User.findOne({id: message.author.id})
        //console.log(User)
    if (User === null) {
        const newUser = new bot.User ({
            id: message.author.id,
            username: message.author.username
        })
        newUser.save()
    }
}