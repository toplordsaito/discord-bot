const fs = require('fs')
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List all available commands.',
	execute(message) {
		let str = '';
		const commands = message.client.commands
		console.log(commands)
		var embed = new MessageEmbed()
			.setImage(message.channel.guild.iconURL())
			.setColor('RANDOM')
			.setAuthor('สั่งเมล็ดได้ตามสั่งเลยค้าบ', message.channel.guild.iconURL())
			.setTimestamp()
		for (const command of commands) {
			embed.addField(`${command[1].name}`, `Description: ${command[1].description}`)
		}
		// msg.reply(embed).catch()
		message.channel.send(embed);
	},
};