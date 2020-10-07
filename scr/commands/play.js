const search = require("yt-search");
const ytdl = require('ytdl-core-discord');

const execute = (bot,msg,args) => {
    const s = args.join(" ");
    try {
        search(s,(err,result) => {
            if (err) {
                throw err;
            }else if(result && result.videos.length > 0) {
                    const song = result.videos[0];
                    console.log(song);
                    const queue = bot.queues.get(msg.guild.id);
                    if (queue) {
                        queue.songs.push(song);
                        bot.queues.set(msg.guild.id, queue);
                    } else playSong(bot, msg, song);
                } else {
                    return msg.channel.send("Não encontrei o que você pediu");
                }
            });
            
    } catch (e) {
        console.error(e);
    }
};

const playSong = async (bot,msg,song) => {
    let queue = bot.queues.get(msg.member.guild.id);    
    if(!song) {
        if (queue) {
            queue.connection.disconnect();
            return bot.queues.delete(msg.member.guild.id);
        }
    };
    if(!msg.member.voice.channel){
        msg.channel.send("Você precisa estar em um canal de audio");
    };
    if (!queue) {
        const conn = await msg.member.voice.channel.join();
        queue = {
          volume: 1,
          connection: conn,
          dispatcher: null,
          songs: [song],
        };
    };
    queue.dispatcher = await queue.connection.play(
    await ytdl(song.url, { highWaterMark: 1 << 25, filter: "audioonly" }),
    {
        type: "opus",
    }
    );
    msg.channel.send(song.url);
    queue.dispatcher.on("finish", () => {
    queue.songs.shift();
    playSong(bot, msg, queue.songs[0]);
    });
    bot.queues.set(msg.member.guild.id, queue);
};

module.exports ={
    name: 'play',
    help: 'Reproduzir faixas de áudio do youtube',
    execute,
    playSong
};