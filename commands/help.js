const fs = require('fs')
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'help',
	description: 'List all available commands.',
	execute(message) {
		let str = '';
		const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));
		var embed = new MessageEmbed()
			.setImage(message.channel.guild.iconURL())
			.setColor('RANDOM')
			.setAuthor('สั่งเมล็ดได้ตามสั่งเลยค้าบ', message.channel.guild.iconURL())
			.setTimestamp()
		for (const file of commandFiles) {
			const command = require(`./${file}`);
			embed.addField(`${command.name}`, `Description: ${command.description}`)
		}
		// msg.reply(embed).catch()
		message.channel.send(embed);
	},
};