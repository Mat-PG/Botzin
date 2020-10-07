const execute = async (bot,msg,args) => {
    const ytdl = require('ytdl-core');
    if (msg.member.voice.channel){
        connection = await msg.member.voice.channel.join();
        try {
            msg.channel.send("Sayōnara");
            gemi.on('finish', () => { 
                msg.member.voice.channel.leave();
            });
        }catch (error) {
            console.log(error);
        }
    }
};

module.exports ={
    name: 'leave',
    help: 'Saio do canal de áudio',
    execute,
}; 