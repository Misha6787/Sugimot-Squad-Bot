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

bot.login(config.token);

const Guild = require('./schema/guild_Schema')
const User = require('./schema/user_Schema')
const Month_lvl = require('./schema/monthlvl_Schema')

const AnimeMonth = async () => await Month_lvl.findOne({ month: 1 });

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

console.log(bot.AnimeMonth)

require("./events/index")(bot);

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/textCommands");

for (const file of commandFiles) {
    let command = require(`./commands/textCommands/${file}`);
    command.names.forEach(el => {
        bot.commands.set(el, command);
    })
}

//console.log(bot.commands);

// setInterval(async ()=> {
//     const User_for_save = await bot.User.find();
//     const Guild_for_save = await bot.Guild.find();
//     User_for_save.save();
//     Guild_for_save.save();
// }, 1000*30); //1000*60*30
