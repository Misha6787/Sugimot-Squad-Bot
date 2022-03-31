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
    const option_1 = {
        label: 'Мут участников',
        description: 'Вы получите 5 минут сумарного времени мута любого участника не относящегося к администраций сервера',
        value: 'mute_members'
    }
    const option_2 = {
        label: 'Перемещение участников',
        description: 'Вы получите заряды перемещений любого участника не относящегося к администраций сервера',
        value: 'move_members'
    }
    const option_3 = {
        label: 'Личная роль',
        description: 'Доступ к ?личнаяроль "Название" "Цвет"',
        value: 'private_role'
    }
    const option_4 = {
        label: 'Создание личной комнаты',
        description: 'Вы получите доступ к созданию личных комнат до конца боевого пропуска',
        value: 'create_private_room'
    }
    const option_5 = {
        label: 'Улучшение личной роли',
        description: 'Ваша роль станет выше всех и будет отображаться в списке участников',
        value: 'upgrade_private_role'
    }

    let options = [option_1, option_2, option_3, option_4, option_5];

    const selectMenu = new MessageSelectMenu()
        .setCustomId('select')
        .setPlaceholder('Ничего не выбрано')
        .addOptions(options)
        .setMaxValues(1);
    const menu = new MessageActionRow()
        .addComponents(selectMenu);
    message.channel.send({
        embeds: [
            {
                title: 'Добро пожаловать в Магазинчик Sugimoto!',
                description: 'Выберите выберите интересующую вас привелегию в выпадаюзем списке',
                fields: [
                    {
                        name: '「 Мут участников 」',
                        value: 'Вы получите 5 минут сумарного времени мута любого участника не относящегося к администраций сервера',
                    },
                    {
                        name: '「 Перемещение участников 」',
                        value: 'Вы получите 10 перемещений любого участника не относящегося к администраций сервера',
                    },
                    {
                        name: '「 Личная роль 」',
                        value: 'Доступ к ?личнаяроль "Название" "Цвет"',
                    },
                    {
                        name: '「 Создание личной комнаты 」',
                        value: 'Вы получите доступ к созданию личных комнат до конца боевого пропуска',
                    },
                    {
                        name: '「 Улучшение личной роли 」',
                        value: 'Ваша роль станет выше всех и будет отображаться в списке участников',
                    },
                ],
            }
        ],
        components: [menu]
    });
}

module.exports.names = ['магазин', 'магаз'];
module.exports.type = 'for_all';