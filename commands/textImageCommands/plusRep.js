const {MessageEmbed} = require("discord.js");

module.exports = async (bot,message,args,argsF) => {
    const exampleEmbed = new MessageEmbed()
        .setTitle('Выезжаю: ')
        .setDescription(`
                    ──────▄▌▐▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▌
                    ───▄▄██▌█ +Rep+Rep+Rep+Rep+Rep+Rep+Rep+Rep
                    ▄▄▄▌▐██▌█ +Rep+Rep+Rep+Rep+Rep+Rep+Rep+Rep
                    ███████▌█▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▌
                    ▀(@)▀▀▀▀▀▀▀(@)(@)▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀▀(@)▀
                `)

        .setColor('#2f3136')

    message.channel.send({ embeds:  [ exampleEmbed ]});
}

module.exports.names = ['+реп'];
module.exports.type = 'text_image';
