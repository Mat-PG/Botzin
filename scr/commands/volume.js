const execute = (bot, msg, args) => {
    const queue = bot.queues.get(msg.guild.id);
    if (!queue) {
      return msg.channel.send("Não estou reproduzindo nada");
    }
    const volume = Number(args.join(" "));
    if (isNaN(volume) || volume < 0 || volume > 200) {
      return msg.channel.send("O volume deve ser um valor entre 0 e 200");
    }
    queue.dispatcher.setVolume(volume / 100);
    queue.volume = volume;
    bot.queues.set(msg.guild.id, queue);
  };
  
  module.exports = {
    name: "vol",
    help: "Ajusta o volume numa escala de 0 a 200",
    execute,
  };