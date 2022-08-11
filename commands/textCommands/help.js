const { EmbedBuilder } = require("discord.js");
const fs = require("fs");

module.exports = async (bot,message,args,argsF) => {

    const textCommandFiles = fs.readdirSync('./commands/textCommands');
    const actionCommandFiles = fs.readdirSync('./commands/actionCommands');
    const Guild = await bot.Guild.findOne({id: message.guildId})
    let textCommands = [];
    let actionCommands = [];

    for (const file of textCommandFiles) {
        let command = require(`./${file}`);
        if (command.type === 'for_all') textCommands += ' `' + Guild.prefix + command.names[0] + '` '
    }
    for (const file of actionCommandFiles) {
        let command = require(`../actionCommands/${file}`);
        if (command.type === 'action_command') actionCommands += ' `' + Guild.prefix + command.names[0] + '` '
    }

    const embed = new EmbedBuilder()
        .setTitle('Приветствую странник, что ты ищешь?')
        .setDescription('Все команды нашего бота в одном сообщений, чумааааа')
        .addFields([
                {
                    name: 'Стандартные команды',
                    value: textCommands
                },
                {
                    name: 'Команды действия',
                    value: actionCommands
                }
        ])
        .setImage('https://c.tenor.com/FiIpwzOalDoAAAAd/kono-suba-anime.gif')
        .setColor(0x9900ff)

    return message.reply({ embeds:  [ embed ]}).catch(error => {console.log(error)});
}

module.exports.names = ['помощь', 'help', 'памаги', 'помоги', 'хелп'];
module.exports.interaction = { //И слэш команда
    name: 'помощь', //И название должно быть такое, как у команды
    description: 'Помощь по командам',
    defaultPermission: true //Про слэш команды можно узнать из документации
};
module.exports.type = 'for_all';
