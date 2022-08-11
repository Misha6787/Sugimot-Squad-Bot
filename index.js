const {IntentsBitField, Partials, Client} = require('discord.js'),
    config = require('./config.json'),
    mongoose = require('mongoose');

config.cfg = {
    ...config.cfg,
    intents: new IntentsBitField(config.cfg.intents),
    partials: [Partials.Channel]
};

const bot = new Client(config.cfg);
bot.login(config.token);
bot.isDev = config.isDev;

mongoose.connect(config.mongo_url, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

const dbConnection = mongoose.connection;

dbConnection.on('error', err => {
    console.log('error', err)
});
dbConnection.once('open', () => {
    console.log('we are connected')
});

const Guild = require('./schema/guild_Schema'),
    User = require('./schema/user_Schema'),
    Month_lvl = require('./schema/monthlvl_Schema'),
    Permissions_battle_pass = require('./schema/permissions_battle_pass_Schema');

const AnimeMonth = async () => await Month_lvl.findOne({ month: config.anime_month });

bot.Guild = Guild;
bot.User = User;
bot.AnimeMonth = AnimeMonth();
bot.Permissions_battle_pass = Permissions_battle_pass;

require('./handlers')(bot); //Запуск handler'ов
require('./events')(bot); //Запуск ивентов