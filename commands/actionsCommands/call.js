const {MessageEmbed} = require("discord.js");
const config = require("../../config.json")
module.exports = async (bot,message,args,argsF) => {

    if (args[0] !== undefined) {
        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        const Guild = await bot.guilds.fetch(message.guildId);

        const arrayGif = config.actions_gif.call_command_gif;
        const randomGif = arrayGif[getRandomInt(0, arrayGif.length + 1)]

        const exampleEmbed = new MessageEmbed()
            .setImage(randomGif)
            .setTimestamp()
            .setFooter({ text: Guild.name, iconURL: Guild.iconURL() })
            .setColor("RANDOM")

        message.channel.send({
            content:  `Проснись ${args[0]}, тебя зовет <@${message.author.id}>`,
            embeds:  [ exampleEmbed ]
        });

        message.delete()

    } else {
        message.channel.send({
            content:  'Упомените человека после команды: `' + `${bot.memory.guilds[message.guildId].prefix}call <участник>` + '`'
        });
    }
}

module.exports.names = ['позвать', 'call'];
module.exports.type = 'action_command';