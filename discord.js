const fs = require('fs')
const Discord = require('discord.js');
const Client = require('./client/Client');
require('dotenv').config();
const prefix = process.env.prefix;
const token = process.env.token;
const port = process.env.port;
const express = require('express')
const app = express()
console.log("port", port)
console.log("token", token.slice(-4))
console.log("prefix", prefix)
app.get('/', (req, res) => {
  res.send('Bot OK!')
})

app.listen(port, () => {
  console.log(`Example app listening at port : ${port}`)
})



const client = new Client();
client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('Ready!');
});

client.once('reconnecting', () => {
	console.log('Reconnecting!');
});

client.once('disconnect', () => {
	console.log('Disconnect!');
});

client.on('message', async message => {
	const args = message.content.slice(prefix.length).split(/ +/);
	const commandName = args.shift().toLowerCase();
	const command = client.commands.get(commandName);

	if (message.author.bot) return;
	if (!message.content.startsWith(prefix)) return;

	try {
		if(commandName == "ban" || commandName == "userinfo") {
			command.execute(message, client);
		} else {
			command.execute(message);
		}
	} catch (error) {
		console.error(error);
		message.reply('There was an error trying to execute that command!');
	}
});


client.login(token);