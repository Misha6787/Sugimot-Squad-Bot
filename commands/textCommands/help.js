const { MessageEmbed } = require("discord.js");
const fs = require("fs");
module.exports = async (bot,message,args,argsF) => {

    const commandFiles = fs.readdirSync("./commands/textCommands");
    const commandTextImage = fs.readdirSync("./commands/textImageCommands");
    const Guild = await bot.Guild.findOne({id: message.guildId})
    let textCommands = [];
    let textImageCommands = [];

    for (const file of commandFiles) {
        let command = require(`./${file}`);
        if (command.type === 'for_all') textCommands += ' `' + Guild.prefix + command.names[0] + '` '
    }
    for (const file of commandTextImage) {
        let command = require(`../textImageCommands/${file}`);
        if (command.type === 'text_image') textImageCommands += ' `' + Guild.prefix + command.names[0] + '` '
    }

    const embed = new MessageEmbed()
        .setTitle("Приветствую странник, что ты ищешь?")
        .setDescription(`Все команды нашего бота в одном сообщений, чумааааа`)
        .setFields(
            {
                name: 'Стандартные команды',
                value: textCommands
            },
            {
                name: 'Текстовые картинки',
                value: textImageCommands
            }
        )
        .setImage('https://c.tenor.com/FiIpwzOalDoAAAAd/kono-suba-anime.gif')
        .setColor('RANDOM')

    message.channel.send({ embeds:  [ embed ]});
}

module.exports.names = ['помощь', 'help', 'памаги', 'помоги', 'хелп'];
module.exports.type = 'for_all';
