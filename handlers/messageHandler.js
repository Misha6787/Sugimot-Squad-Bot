const Discord = require('discord.js');
const fs = require('fs');
module.exports = (bot) => {
    bot.commands = new Discord.Collection(); //Коллекция команд
    bot.commands.any = []; //Корекция дополнительных путей

    const textCommandFiles = fs.readdirSync('./commands/textCommands'); //Список файлов команд
    const actionCommandFiles = fs.readdirSync('./commands/actionCommands'); //Список файлов команд

    for (const file of textCommandFiles) {
        const command = require(`../commands/textCommands/${file}`);
        for (const name of command.names) bot.commands.set(name, command); //Коллекция команд
        bot.commands.any.push(command); //Доп. путь
    }
    for (const file of actionCommandFiles) {
        const command = require(`../commands/actionCommands/${file}`);
        for (const name of command.names) bot.commands.set(name, command); //Коллекция команд
        bot.commands.any.push(command); //Доп. путь
    }

    bot.on("messageCreate", async (message)=> {
        const {content, author, guild} = message; //Разбивка на компоненты

        // Добавление/Проверка гильдий в базе данных
        const thisGuild = await bot.Guild.findOne({id: message.guildId}); // Текущая гильдия
        if (thisGuild === null && !author.bot) {
            const newGuild = new bot.Guild({
                id: guild.id,
                name: guild.name,
                prefix: '?',
            });
            await newGuild.save(); // Сохранение новой гильдий в базу данных
        }

        // Добавление/Проверка юзера в базе данных
        const User = await bot.User.findOne({ id: author.id, guildId: guild.id }); // Текущий пользователь
        if (User === null && !author.bot) {
            const newUser = new bot.User ({
                id: author.id,
                guildId: guild.id,
                name: author.username,
            });
            await newUser.save(); // Сохранение нового пользователя в базу данных
        }

        if (author.bot || //Если автор - бот
            !thisGuild || //Если нет гильди в памяти
            content.slice(0, thisGuild.prefix.length) !== thisGuild.prefix //Если не начинается на префикс
        ) return; //Не выполняем код дальше
        
        const 
            messageArray = content.toLowerCase().trim().split(' '), 
            command = messageArray[0].replace(thisGuild.prefix, ""),
            args = messageArray.slice(1), 
            messageArrayFull = content.trim().split(' '), 
            argsF = messageArrayFull.slice(1),
            commandRun = bot.commands.get(command);

        if(commandRun) commandRun(bot,message,args,argsF) //Вызов функции
        .catch(err => console.error(err));
        //.then(any => console.log(any))
    });
};
