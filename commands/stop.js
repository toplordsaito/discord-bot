module.exports = {
	name: 'stop',
	description: 'Stop all songs in the queue!',
	execute(message) {
		const serverQueue = message.client.queue.get(message.guild.id);
		// const serverSetting = message.client.setting.get(message.guild.id);
		// serverSetting.auto_play = false
		if (!message.member.voice.channel) return message.channel.send('You have to be in a voice channel to stop the music!');
		serverQueue.songs = [];
		serverQueue.voiceChannel.leave();
		serverQueue.connection.dispatcher.end();
		queue.delete(guild.id);
		
	},
};