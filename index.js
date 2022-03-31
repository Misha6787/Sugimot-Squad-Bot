const Discord = require('discord.js');
let fs = require('fs');
let config = require('./config.json');
const mongoose = require('mongoose')
mongoose.connect(config.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
config.cfg.intents = new Discord.Intents(config.cfg.intents);

const bot = new Discord.Client(config.cfg);

//const { Intents } = require("discord.js")
//const bot = new Discord.Client({intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MEMBERS]})
//other intents may be added. Make sure it has server members intent (Intents.FLAGS.GUILD_MEMBERS)


// const bot = new Discord.Client({ ws: { intents: Discord.Intents.ALL } })

bot.login(config.token);

const Guild = require('./schema/guild_Schema')
const User = require('./schema/user_Schema')
const Month_lvl = require('./schema/monthlvl_Schema')
const Permissions_battle_pass = require('./schema/permissions_battle_pass_Schema')

const AnimeMonth = async () => await Month_lvl.findOne({ month: config.anime_month });

const dbConnection = mongoose.connection;

dbConnection.on('error', err => {
    console.log('error', err)
})
dbConnection.once('open', () => {
    console.log('we are connected')
})

bot.Guild = Guild
bot.User = User
bot.AnimeMonth = AnimeMonth()
bot.Permissions_battle_pass = Permissions_battle_pass

console.log(bot.AnimeMonth)

require("./events/index")(bot);

bot.commands = new Discord.Collection();

// Добовление обычных команд
const commandFiles = fs.readdirSync("./commands/textCommands");

for (const file of commandFiles) {
    let command = require(`./commands/textCommands/${file}`);
    command.names.forEach(el => {
        bot.commands.set(el, command);
    })
}

// Добовление команд текстовых картинок
const textImageCommandFiles = fs.readdirSync("./commands/textImageCommands");

for (const file of textImageCommandFiles) {
    let command = require(`./commands/textImageCommands/${file}`);
    command.names.forEach(el => {
        bot.commands.set(el, command);
    })
}

// Добовление таймера окончания баттл паса
const battlePassTimer = require('./helpers/battle_pass_timer');
const deadline = config.dead_line_battle_pass;

(async function () {
    await battlePassTimer(bot, deadline)
})()





//const getTimer = async () => await battlePassTimer();

