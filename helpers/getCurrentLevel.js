
const getCurrentLevel = async (bot, levelUser) => {
    const battle_pass_anime = await bot.AnimeMonth;

    let currentLevel = levelUser - (levelUser % 10);
    currentLevel = currentLevel < 100 ? currentLevel : 100
    let thisLevelElement = battle_pass_anime.level[currentLevel];

    return {
        level: currentLevel,
        element: thisLevelElement
    }
}

module.exports = getCurrentLevel
