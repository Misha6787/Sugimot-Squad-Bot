module.exports = async (bot,message,args,argsF) => {

    // Проверки роли, и проверка на бота и т.д \\
    const User = await bot.User.findOne({id: message.author.id, guildId: message.guildId});

    let ifRoles = 0;
    message.member.roles.cache.forEach(item => {
        if (item.id === '944259753587126333' && User.permissions.private_role.status) {
            ifRoles++;
        }
    })

    if (ifRoles === 0 || User.permissions.private_role.private_role_id === '0') {
        message.channel.send({
            embeds: [
                {
                    title: 'У вас недостаточно прав!',
                    color: 0xff0000
                }
            ]
        });
        return;
    }


    // ================================= \\

    let guildRole = await message.guild.roles.fetch(User.permissions.private_role.private_role_id)

    //Удаление роли

    message.guild.roles.delete(User.permissions.private_role.private_role_id)
        .then(() => {
            message.reply({
                embeds: [
                    {
                        title: 'Персональная роль успешно удалена',
                        description: `Помянем роль ${guildRole.name}, она была классной(`,
                        color: 0x4fff29
                    }
                ]
            })
        })
        .catch(console.error);

    User.permissions.private_role.used_command = false;
    User.permissions.private_role.private_role_id = '0';
    User.permissions.upgrade_private_role = false;

    User.save();
}

module.exports.names = ['удалитьроль', 'deleterole'];
module.exports.interaction = { //И слэш команда
    name: 'удалитьроль', //И название должно быть такое, как у команды
    description: 'Удалить надоевшую роль)',
    defaultPermission: true //Про слэш команды можно узнать из документации
};
module.exports.type = 'for_all';