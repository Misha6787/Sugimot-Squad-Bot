const {MessageEmbed} = require("discord.js");

module.exports = async (bot,message,args,argsF) => {
    const exampleEmbed = new MessageEmbed()
        .setTitle('Гав')
        .setDescription(`
                    ░░░░░░░█▐▓▓░████▄▄▄█▀▄▓▓▓▌█
                    ░░░░░▄█▌▀▄▓▓▄▄▄▄▀▀▀▄▓▓▓▓▓▌█
                    ░░░▄█▀▀▄▓█▓▓▓▓▓▓▓▓▓▓▓▓▀░▓▌█
                    ░░█▀▄▓▓▓███▓▓▓███▓▓▓▄░░▄▓▐█▌
                    ░█▌▓▓▓▀▀▓▓▓▓███▓▓▓▓▓▓▓▄▀▓▓▐█
                    ▐█▐██▐░▄▓▓▓▓▓▀▄░▀▓▓▓▓▓▓▓▓▓▌█▌
                    █▌███▓▓▓▓▓▓▓▓▐░░▄▓▓███▓▓▓▄▀▐█
                    █▐█▓▀░░▀▓▓▓▓▓▓▓▓▓██████▓▓▓▓▐█
                    ▌▓▄▌▀░▀░▐▀█▄▓▓██████████▓▓▓▌█▌
                    ▌▓▓▓▄▄▀▀▓▓▓▀▓▓▓▓▓▓▓▓█▓█▓█▓▓▌█▌
                    █▐▓▓▓▓▓▓▄▄▄▓▓▓▓▓▓█▓█▓█▓█▓▓▓▐█
                `)

        .setColor('#2f3136')

    message.channel.send({ embeds:  [ exampleEmbed ]});
}

module.exports.names = ['доги'];
module.exports.type = 'text_image';
