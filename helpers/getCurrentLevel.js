
const getCurrentLevel = async (bot, levelUser) => {
    const battle_pass_anime = await bot.AnimeMonth;

    let currentLevel = levelUser - (levelUser % 10);
    let thisLevelElement = battle_pass_anime.level[currentLevel];
    // let thisLevelElement;
    // let currentLevel;
    //let currentIndex;
    // let keys = Object.keys(battle_pass_anime.level)

    // keys.push(levelUser)

    // keys = keys.map(string => +string)

    // keys.sort(function(a, b){return a - b})

    // currentIndex = keys.indexOf(levelUser) - 1 >= 0 ? keys.indexOf(levelUser) - 1 : 0 ;
    // currentLevel = keys[keys.indexOf(levelUser) - 1] >= 0 ? keys[keys.indexOf(levelUser) - 1] : keys[0] ;

    //thisLevelElement = battle_pass_anime.level[keys[currentIndex]]

    return {
        level: currentLevel,
        element: thisLevelElement
    }
}

module.exports = getCurrentLevel
