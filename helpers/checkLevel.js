const checkLevel = async (bot, userId, guildId) => {
    const User = await bot.User.findOne({id: userId, guildId: guildId});
    let UserExperience = User.experience,
        UserLevel = User.level_battle_pass;

    let limitsExperience = 1000 + 100 * UserLevel

    if (UserExperience >= limitsExperience) {
        User.experience -= limitsExperience
        User.level_battle_pass++
        User.save()
    }
}

module.exports = checkLevel;