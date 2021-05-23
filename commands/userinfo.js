const { getUserFromMention } = require('../util/getUser')
const { MessageEmbed } = require('discord.js');

module.exports = {
	name: 'userinfo',
	description: 'Get information about a user.',
	execute(message, client) {
		const split = message.content.split(/ +/);
		const args = split.slice(1);
		const user = getUserFromMention(args[0], client);
		if (!user) return message.channel.send("อยากรู้จักใครก็ tag ด้วยสิ!")
		console.log(user.tag)
		if (user.tag === "GREAT#9562") {
			var embed = new MessageEmbed()
				.setImage(user.displayAvatarURL())
				.setColor('RANDOM')
				.setAuthor('คนใจร้ายหมายเลข 0', user.displayAvatarURL())
				.setTimestamp()
			let atk = parseInt(Math.random() * 10)
			let def = parseInt(Math.random() * 10)
			let boyfriend = parseInt(Math.random() * 100)
			embed.addFields(
				[
					{ "name": "คำอธิบาย", "value": "คนใจร้าย ไร้ใจ โหดร้าย หลายตี้" },
					{ "name": "stat", "value": `ATK : ${atk} DEF : ${def} current boyfriend : ${boyfriend}` }
				]
			)
			message.channel.send(embed);

		} else if (user.tag === "Damn it🐔#3627") {
			var embed = new MessageEmbed()
				.setImage(user.displayAvatarURL())
				.setColor('RANDOM')
				.setAuthor('คนชอบเท + สับราง', user.displayAvatarURL())
				.setTimestamp()
			let atk = parseInt(Math.random() * 10)
			let def = parseInt(Math.random() * 10)
			let boyfriend = parseInt(Math.random() * 100000)
			embed.addFields(
				[
					{ "name": "คำอธิบาย", "value": "ตัวบัคของห้อง ดรอปของโหดสัส แต่ชอบสับตี้" },
					{ "name": "stat", "value": `ATK : ${atk} DEF : ${def} ความหิว : ${boyfriend}` }
				]
			)
			message.channel.send(embed);
		} else {
			message.channel.send(`Name: ${user.username}, Role: ตัวประกอบในเซิฟ, Avatar: ${user.displayAvatarURL({ dynamic: true })}`);
		}

	}
};

// GREAT#9562
//Damn it🐔#3627