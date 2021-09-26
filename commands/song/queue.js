const { MessageEmbed } = require('discord.js');


module.exports = {
    name: 'queue',
    description: 'check song queue!',
    execute(message) {
        const serverQueue = message.client.queue.get(message.guild.id);
        if (!serverQueue) return message.channel.send('There is nothing playing.');
        console.log(serverQueue.songs)
        var embed = new MessageEmbed()
            .setImage(message.channel.guild.iconURL())
            .setColor('RANDOM')
            .setAuthor('queue ขณะนี้', message.channel.guild.iconURL())
            .setTimestamp()
        for (const song of serverQueue.songs) {
            embed.addField(`-------------------------------`, `song: ${song.title}`)
        }
        message.channel.send(embed);
        // return message.channel.send(`Now playing: ${serverQueue.songs[0].title}`);
    },
};