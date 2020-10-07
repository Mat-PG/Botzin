const { TOKEN_DISCORD, PREFIX} = require('../config.js');
const Discord = require('discord.js');
const fs = require("fs");
const path = require("path");
const dotenv = require('dotenv');
const bot = new Discord.Client();
const client = require('nekos.life');
bot.commands = new Discord.Collection();
bot.queues = new Map();


require('dotenv/config');

console.log(process.env.example.TOKEN)

const commandFiles = fs
    .readdirSync(path.join(__dirname, "/commands"))
    .filter((filename) => filename.endsWith(".js"));

for(var filename of commandFiles){
    const command = require(`./commands/${filename}`);
    bot.commands.set(command.name, command);
}
bot.login(TOKEN_DISCORD);



bot.on("ready", function () {
    console.log("Olá onii-chan <3.");
});
try {
    bot.on("message", (msg) => {
        if (!msg.content.startsWith(PREFIX) || msg.author.bot) return;
        const args = msg.content.slice(PREFIX.length).split(" ");
        const command = args.shift();
        try {
            bot.commands.get(command).execute(bot,msg,args);
        }catch (e) {
            console.log(e);
            return msg.reply("Insira um comando válido. (M help).");
        }
    });
} catch (error) {
    return console.log(erro);
}
