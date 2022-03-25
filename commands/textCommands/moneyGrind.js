module.exports = async (bot,message,args,argsF) => {

    // Проверки роли, и проверка на бота и т.д \\

    //const user = message.mentions.users.first();
    let ifRoles = 0;
    message.member.roles.cache.forEach(item => {
        if (item.id === '777322473523249182' ||
            item.id === '900529098571546654' ||
            item.id === '777304185380274206' ||
            item.id === '777304566844751902' ||
            item.id === '944259753587126333') {
            ifRoles++
        }
    });
    if (ifRoles === 0) {
        message.channel.send({
            embeds: [
                {
                    title: `У вас недостаточно прав!`,
                    color: '#ff0000'
                }
            ]
        });
        return;
    }

    // ======================================= \\

    const User = await bot.User.findOne({id: message.author.id, guildId: message.guildId});


    if (args[0] !== undefined) {
        let balance = Number(User.money);
        User.money = balance + Number(args[0])
        message.channel.send({
            embeds: [{
                title: 'Результат',
                description:  `Вы получили **${args[0]}$** \nВаш баланс: **${User.money}$**`,
                color: 'RANDOM'
            }]
        });
        User.save()
    } else {
        message.channel.send({
            embeds: [
                {
                    title: `Введите необходимую сумму!`,
                    color: '#ff0000'
                }
            ]
        });
    }
}

module.exports.names = ['получитькойны', 'получитькоины', 'moneygrind'];

// текстовые каналы 500 символов = 10 монет
// гс чат 1 час = 50 монет

// 1р = под вопросом

// Могут перемещать и мутить
// Своя роль
// Своя роль
// Вип канал
// Каждый месяц разная тематика випов и их названия каждый сезон отсылка к разному анимэ
// Кланы будут относиться к сетингку анимэ сезона
// Монеты можно потратить на анимэ сезона
// У каждого сезона свое анимэ
// Нужно найти 12 анимэ которые будут сменять друг друга каждый месяц по сезонам
// Менять текст бота на фразы анимэ
// Фан сервис, когда повышаешь уровень в сообщений будет фан сервис гифка под тематику сезона
