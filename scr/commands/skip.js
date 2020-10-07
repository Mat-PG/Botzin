const playSong = require("./play").playSong;

const execute = (bot, msg, args) => {
  const queue = bot.queues.get(msg.guild.id);
  if (!queue) {
    return msg.channel.send("Não estou reproduzindo nada");
  }
  try {
    queue.songs.shift();
    bot.queues.set(msg.guild.id, queue);
    playSong(bot, msg, queue.songs[0]);
  } catch (error) {
      console.log(error);
  }
  
};

module.exports = {
  name: "skip",
  help: "Pula para a próxima música",
  execute,
};