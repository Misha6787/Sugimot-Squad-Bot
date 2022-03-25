
const getCurrentLevel = async (bot, userId, guildId) => {

    const User = await bot.User.findOne({id: userId, guildId: guildId});
    const levelUser = User.level_battle_pass;
    const battle_pass_anime = await bot.AnimeMonth;

    let thisLevelElement;
    let currentLevel;
    let currentIndex;
    let keys = Object.keys(battle_pass_anime.level)

    keys.push(levelUser)

    keys = keys.map(string => +string)

    keys.sort(function(a, b){return a - b})

    currentIndex = keys.indexOf(levelUser) - 1 >= 0 ? keys.indexOf(levelUser) - 1 : 0 ;
    currentLevel = keys[keys.indexOf(levelUser) - 1] >= 0 ? keys[keys.indexOf(levelUser) - 1] : 0 ;

    thisLevelElement = battle_pass_anime.level[keys[currentIndex]]

    // let testLevelElement;
    //
    // for (let key in battle_pass_anime.level) {
    //     if (+key === currentLevel) {
    //         testLevelElement = battle_pass_anime.level[key];
    //     }
    // }


    // console.log('keys ', keys)
    // console.log('keys.indexOf(levelUser) ', keys.indexOf(levelUser))
    // console.log('keys[keys.indexOf(levelUser) - 1] ', keys[keys.indexOf(levelUser) - 1])

    //console.log(testLevelElement)

    return {
        level: currentLevel,
        element: thisLevelElement
    }
}

module.exports = getCurrentLevel
