const execute = async (bot,msg,args) => {
    const ytdl = require('ytdl-core');
    if (msg.member.voice.channel){
        connection = await msg.member.voice.channel.join();
        try {
            msg.channel.send("Estou chegando");
        }catch (error) {
            console.log(error);
        }
    }else{
        msg.channel.send("Você precisa estar em um canal de audio.");
    };
};

module.exports ={
    name: 'join',
    help: 'Me junto ao canal de áudio que você esta',
    execute,
};