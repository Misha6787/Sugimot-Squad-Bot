const {MessageEmbed} = require("discord.js");
module.exports = async (bot,message,args,argsF) => {
    if (args[0] !== undefined) {
        // message.channel.send({
        //     content:  `Проснись ${args[0]}, тебя зовет <@${message.author.id}>`,
        //     embeds: [
        //         {
        //             image: ['https://i.imgur.com/r6v4q7f.gif']
        //         },
        //     ]
        // });

        function getRandomInt(min, max) {
            min = Math.ceil(min);
            max = Math.floor(max);
            return Math.floor(Math.random() * (max - min)) + min; //Максимум не включается, минимум включается
        }

        const arrayGif = [
            'https://c.tenor.com/7xh8CROljNAAAAAC/inosuke-demon-slayer.gif',
            'https://c.tenor.com/mNnKUAr4xvwAAAAd/watch-demon-slayer-zenitsu.gif',
            'https://c.tenor.com/T5EzSN25be0AAAAC/demon-slayer-kimetsu-no-yaiba.gif',
            'https://c.tenor.com/M1MLHpGTwusAAAAC/tengen-uzui-demon-slayer.gif'
        ]
        const randomGif = arrayGif[getRandomInt(0, arrayGif.length + 1)]

        const exampleEmbed = new MessageEmbed()
            .setImage(randomGif)
            .setTimestamp()
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
module.exports.type = 'for_all';