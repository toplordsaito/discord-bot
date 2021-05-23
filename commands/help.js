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
			.setAuthor('สั่งไม้ได้ตามสั่ง', message.channel.guild.iconURL())
			.setTimestamp()
		for (const file of commandFiles) {
			const command = require(`./${file}`);
			// str += `Name: ${command.name}, Description: ${command.description} \n`;
			embed.addField(`${command.name}`, `Description: ${command.description}`)

		}
		// await embed.addField("มา", come)
		// await embed.addField("ขาด", upset)
		// msg.reply(embed).catch()



		message.channel.send(embed);
	},
};