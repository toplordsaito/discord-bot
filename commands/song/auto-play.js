module.exports = {
	name: 'auto',
	description: 'Pause current song!',
	execute(message) {
		// const args = message.content.split(/ +/)
		// console.log(args)
		const serverSetting = message.client.setting.get(message.guild.id);
		// if (args[1] == "auto_play"){
		// 	serverSetting.auto_play = args[2]
		// }else if (args[1] == "volume"){
		// 	serverSetting.volume = args[2]
		// }
		serverSetting.auto_play = !serverSetting.auto_play
        message.channel.send(`auto-play: ${serverSetting.auto_play?"on":"off"}`);
	},
};
