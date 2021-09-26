module.exports = {
	name: 'auto',
	description: 'Pause current song!',
	execute(message) {
		const args = message.content.split(/ +/)
		// console.log(args)
		const serverSetting = message.client.setting.get(message.guild.id);
		if (args[1] == "first"){
			serverSetting.auto_play = args[1]
		}else if (args[1] == "auto"){
			serverSetting.auto_play = args[1]
		}else if (args[1] == "off"){
			serverSetting.auto_play = false
		}else{
			// serverSetting.auto_play = false
		}
		// serverSetting.auto_play = !serverSetting.auto_play
        message.channel.send(`auto-play: ${serverSetting.auto_play?serverSetting.auto_play:"off"}`);
	},
};
