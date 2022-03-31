module.exports = async (bot,message,args,argsF) => {
    if (args[0] !== undefined) {
        message.channel.send({
            content:  `Проснись ${args[0]}, тебя зовет <@${message.author.id}>`,
            embeds: [
                {
                    title: 'dude',
                    files: ['https://i.imgur.com/r6v4q7f.gif']
                },
            ],
            //files: ['https://i.imgur.com/r6v4q7f.gif'],
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