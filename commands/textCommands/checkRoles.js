module.exports = async (bot, message, args, argsF) => {
    let rolesUser;
    message.member.roles.cache.forEach(item => {
        if (item.name !== "@everyone") {
            rolesUser += `\n<@&${item.id}>`;
        }
    });
    message.channel.send({
        embeds: [
            {
                title: `Привет ${message.author.username}`,
                description: `Ваши роли: ${rolesUser}`,
                color: '#b87cec'
            }
        ]
    });

    //console.log(message.channel.permissionsFor(message.author).permissions)

    //console.log(message.channel.permissionsFor(message.author).has(Permissions.FLAGS.BAN_MEMBERS));
}

module.exports.names = ['мойроли', 'моироли', 'checkroles'];
module.exports.type = 'moderation';