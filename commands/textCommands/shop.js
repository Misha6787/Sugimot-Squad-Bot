const {MessageEmbed, MessageSelectMenu, MessageActionRow} = require("discord.js");
module.exports = async (bot,message,args,argsF) => {

    const User = await bot.User.findOne({id: message.author.id, guildId: message.guildId});

    if (User === null) return;

    // for (let permission in User.permissions) {
    //     permissions.push(permission)
    // }
    // const options = (name, value, description) => {
    //     return {
    //         lable: name,
    //         value: value,
    //         description: description,
    //         emoji: null,
    //         default: false
    //     }
    // }

    const PermissionsBattlePass = await bot.Permissions_battle_pass.find();

    const Guild = await bot.guilds.fetch(message.guildId);

    let options = [];
    let fieldsItems = []

    PermissionsBattlePass.forEach(item => {
        options.push({
            label: item.options.label,
            description: item.options.description,
            value: item.name
        })
        fieldsItems.push({
            name: `「 ${item.options.label} 」`,
            value: item.options.description,
        })
    })

    const selectMenu = new MessageSelectMenu()
        .setCustomId('select')
        .setPlaceholder('Ничего не выбрано')
        .addOptions(options)
        .setMaxValues(1);
    const menu = new MessageActionRow()
        .addComponents(selectMenu);

    const embed = new MessageEmbed()
        .setTitle('Добро пожаловать в Магазинчик Sugimoto!')
        .setDescription('Выберите интересующую вас привелегию в выпадающем списке')
        .setFields(fieldsItems)
        .setColor('#2f3136')
        .setFooter({ text: Guild.name, iconURL: Guild.iconURL() })
        .setTimestamp()

    message.channel.send({
        embeds: [
            embed
        ],
        components: [menu]
    });
}

module.exports.names = ['магазин', 'магаз'];
module.exports.type = 'for_all';