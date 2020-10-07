const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if (!queue) {
      return msg.channel.send("Não estou reproduzindo nada");
    }
    queue.dispatcher.resume();
  };
  
  module.exports = {
    name: "resume",
    help: "Continua a reprodução de música atual",
    execute,
  };