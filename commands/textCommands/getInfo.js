
module.exports = async (bot,message,args,argsF) => {

    const User = await bot.User.findOne({id: message.author.id, guildId: message.guildId});
    const levelUser = User.level_battle_pass;
    const battle_pass_anime = await bot.AnimeMonth;

    let thisLevel;

    let keys = Object.keys(battle_pass_anime.level)

    keys.push(levelUser)

    let newArray = [];

    keys.forEach((item) => {
        newArray.push(Number(item));
    })

    let currentLevel;

    newArray.sort(function(a, b){return a - b})

    newArray.forEach((item, index) => {
        if (item === levelUser && index !== 0) {
            currentLevel = newArray[index - 1]
        }
    })

    for (let i = 0, l = keys.length; i < l; i++) {
        if (+keys[i] === +levelUser ) {
            thisLevel = battle_pass_anime.level[keys[i]]
        }
    }

    console.log(currentLevel);
}

module.exports.names = ['инфа'];
