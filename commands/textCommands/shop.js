const {EmbedBuilder, SelectMenuBuilder, ActionRowBuilder} = require("discord.js");

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

    const selectMenu = new SelectMenuBuilder()
        .setCustomId('select')
        .setPlaceholder('Ничего не выбрано')
        .addOptions(options)
        .setMaxValues(1);
    const menu = new ActionRowBuilder()
        .addComponents(selectMenu);

    const embed = new EmbedBuilder()
        .setTitle('Добро пожаловать в Магазинчик Sugimoto!')
        .setDescription('Выберите интересующую вас привелегию в выпадающем списке')
        .setFields(fieldsItems)
        .setColor(0x9900ff)
        .setFooter({ text: Guild.name, iconURL: Guild.iconURL() })
        .setTimestamp()

    message.reply({
        embeds: [
            embed
        ],
        components: [menu]
    }).catch(error => {console.log(error)});
}

module.exports.names = ['магазин', 'shop', 'магаз']; //У неё есть название
module.exports.interaction = { //И слэш команда
    name: 'магазин', //И название должно быть такое, как у команды
    description: 'Магазинчик нашего сервера)',
    defaultPermission: true //Про слэш команды можно узнать из документации
};
module.exports.type = 'for_all';