module.exports = (member = {id: "!", user: {username:"!"}, guild: {id: "!"}}) => {
    return {
        id: member.id,
        name: member.user.username,
        guildId: member.guild.id,
        money: 0,
        warns: [],
        countSymbol: 0,
        inVoiceChannel: false
    };
};