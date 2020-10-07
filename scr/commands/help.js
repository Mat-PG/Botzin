const execute = (bot,msg,args) => {
    let string = "====== MEUS COMANDOS ======\n                          M(espaço)       \n                                   +\n";
    bot.commands.forEach(command => {
        if (command.help) {
            string+= `  **${command.name}**  -  ${command.help}\n\n`;
        }
    });
    return msg.channel.send(string);
};

module.exports ={
    name: 'help',
    help: 'Auto explicativo',
    execute,
};