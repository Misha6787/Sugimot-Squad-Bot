const {EmbedBuilder} = require("discord.js");
const config = require("../../config.json")
module.exports = async (bot,message,args,argsF) => {

    // if (args[0] !== undefined) {
    //
    // } else {
    //     message.reply({
    //         content: 'Упомените человека после команды: `' + `${bot.memory.guilds[message.guildId].prefix}call <участник>` + '`'
    //     });
    // }
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
    }

    const Guild = await bot.guilds.fetch(message.guildId);

    const arrayGif = config.actions_gif.call_command_gif;
    const randomGif = arrayGif[getRandomInt(0, arrayGif.length + 1)]

    const exampleEmbed = new EmbedBuilder()
        .setImage(randomGif)
        .setTimestamp()
        .setFooter({ text: Guild.name, iconURL: Guild.iconURL() })
        .setColor('Random')

    message.reply({
        content:  `Проснись <@${args.user}>, тебя зовет <@${message.author.id}>`,
        embeds:  [ exampleEmbed ]
    });
}

module.exports.names = ['позвать', 'call'];
module.exports.interaction = { //И слэш команда
    name: 'позвать', //И название должно быть такое, как у команды
    description: 'Позови кого нибудь!',
    options: [
        {
            name: 'user',
            description: 'Пользователь которого ты хочешь позвать',
            type: '6',
            required: true
        }
    ],
    defaultPermission: true //Про слэш команды можно узнать из документации
};
module.exports.type = 'action_command';