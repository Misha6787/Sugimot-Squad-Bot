const { MessageEmbed } = require("discord.js");
const fs = require("fs");
module.exports = async (bot,message,args,argsF) => {

    const commandFiles = fs.readdirSync("./commands/textCommands");
    const Guild = await bot.Guild.findOne({id: message.guildId})
    let commands = [];

    console.log(Guild)

    for (const file of commandFiles) {
        let command = require(`./${file}`);
        commands += ' `' + Guild.prefix + command.names[0] + '` '
    }

    const embed = new MessageEmbed()
        .setTitle("Приветствую странник, что ты ищешь?")
        .setDescription(`Все команды нашего бота в одном сообщений, чумааааа`)
        .setFields(
            {
                name: 'Стандартные команды',
                value: commands
            }
        )
        .setImage('https://c.tenor.com/FiIpwzOalDoAAAAd/kono-suba-anime.gif')
        .setColor('RANDOM')

    message.channel.send({ embeds:  [ embed ]});
}

module.exports.names = ['помощь', 'help', 'памаги', 'помоги', 'хелп'];
