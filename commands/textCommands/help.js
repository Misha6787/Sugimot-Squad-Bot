const { MessageEmbed } = require("discord.js");
const fs = require("fs");
module.exports = async (bot,message,args,argsF) => {

    const commandFiles = fs.readdirSync("./commands/textCommands");
    let commands = [];


    for (const file of commandFiles) {
        let command = require(`./${file}`);
        commands += ' `' + bot.Memory.guilds[message.guild.id].prefix + command.names[0] + '` '
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
