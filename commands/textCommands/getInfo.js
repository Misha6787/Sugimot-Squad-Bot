const {MessageEmbed} = require("discord.js");

module.exports = async (bot,message,args,argsF) => {

    const User = await bot.User.findOne({id: message.author.id, guildId: message.guildId});
    const levelUser = User.level_battle_pass;
    const battle_pass_anime = await bot.AnimeMonth;


    // const embed = new MessageEmbed()
    //     .setTitle('Неправильный или несуществующий цвет')
    //     .setDescription('Напишите правильное название нужного вам цвета \n можете выбрать из предложенных базовых цветов')
    //     .setColor('#ff0000')
    //
    // message.channel.send({ embeds: [ embed ] });
}

module.exports.names = ['инфа'];
module.exports.type = 'moderation';
