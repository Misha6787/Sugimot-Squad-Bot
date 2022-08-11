module.exports = async (bot,message,args,argsF) => {

    // Проверки роли, и проверка на бота и т.д \\

    let ifRoles = 0;
    message.member.roles.cache.forEach(item => {
        if (item.id === '777322473523249182' ||
            item.id === '900529098571546654' ||
            item.id === '777304185380274206' ||
            item.id === '777304566844751902' ||
            item.id === '944259753587126333') {
            ifRoles++;
        }
    });
    if (ifRoles === 0) {
        message.reply({
            embeds: [
                {
                    title: 'У вас недостаточно прав!',
                    color: 0xff0000
                }
            ]
        });
        return;
    }

    // ======================================= \\

    const User = await bot.User.findOne({id: message.author.id, guildId: message.guildId});

    let balance = +User.money;
    User.money = balance + +args.coins;
    message.reply({
        embeds: [{
            title: 'Результат',
            description:  `Вы получили **${args.coins} Sugimoto Coins** \nВаш баланс: **${User.money} Sugimoto Coins**`,
            color: 0x00FF00
        }]
    });
    User.save();

}

module.exports.names = ['получитькойны', 'getcoins', 'получитькоины'];
module.exports.interaction = { //И слэш команда
    name: 'получитькойны', //И название должно быть такое, как у команды
    description: 'Это только для админов)',
    options: [
        {
            name: 'coins', // писать только в нижнем регистре
            description: 'Кол-во выдаваемых койнов',
            type: 4,
            required: true
        }
    ],
    defaultPermission: 0 //Про слэш команды можно узнать из документации
};
module.exports.type = 'moderation';

