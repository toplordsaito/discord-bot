module.exports = {
	name: 'auto',
	description: 'Pause current song!',
	execute(message) {
		const serverSetting = message.client.setting.get(message.guild.id);
		serverSetting.auto_play = !serverSetting.auto_play
        message.channel.send(`auto-play: ${serverSetting.auto_play?"on":"off"}`);
	},
};
