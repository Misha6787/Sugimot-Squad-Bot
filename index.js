const Discord = require('discord.js');
let fs = require('fs');
let config = require('./config.json');
const DiscordDB = require('simple-discord.db');
const mongoose = require('mongoose')
mongoose.connect(config.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})




config.cfg.intents = new Discord.Intents(config.cfg.intents);

const bot = new Discord.Client(config.cfg);

bot.login(config.token);

const User = require('./schema/messageSchema')
//bot.messageSchema = messageSchema

//const MyModel = mongoose.model('User', messageSchema, 'Users')

const dbConnection = mongoose.connection;

dbConnection.on('error', err => {
    console.log('error', err)
})
dbConnection.once('open', () => {
    console.log('we are connected')
})

bot.User = User

require("./events/index")(bot);

bot.commands = new Discord.Collection();

const commandFiles = fs.readdirSync("./commands/textCommands");

for (const file of commandFiles) {
    let command = require(`./commands/textCommands/${file}`);
    command.names.forEach(el => {
        bot.commands.set(el, command);
    })
}

console.log(bot.commands);

// bot.memory = require('./memory.json');
//
// setInterval(()=> {
//     fs.writeFileSync(`./memory.json`, JSON.stringify(bot.memory, null, '\t'));
//     console.log('Обновление памяти')
// }, 1000*30);

bot.Memory = new DiscordDB("Memory", bot);

setInterval(()=> {
    bot.Memory.save();
}, 1000*60*30);

// bot.createGuild = (guild = {id: "!", name: "!"}) => {
//     return {
//         id: guild.id,
//         name: guild.name,
//         muted: [],
//         prefix: "s!",
//         members: {},
//         warns: 0
//     };
// };
// bot.createUser = (user = {id: "!", username: "!"}) => {
//     return {
//         id: user.id,
//         name: user.username,
//         notes: []
//     };
// };
// bot.createMember = (member = {id: "!", user: {username:"!"}, guild: {id: "!"}}) => {
//     return {
//         id: member.id,
//         name: member.user.username,
//         guildId: member.guild.id,
//         money: 0,
//         warns: []
//     };
// };
// (async function () {
//     await bot.Memory.create();
//     bot.Memory.setAutoStart(true);
//     bot.Memory.setBackUp(1000*60*60*4);
//     bot.Memory.setAutoSave(1000*60*60);
//     bot.Memory.setGuilds(bot.createGuild);
//     bot.Memory.setUsers(bot.createUser);
//     bot.Memory.setMembers(bot.createMember);
//     bot.Memory.save();
// }());