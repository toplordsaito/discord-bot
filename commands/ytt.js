const fetch = require("node-fetch");
module.exports = {
    name: 'youtube',
    description: 'youtube',
    execute(message) {
        console.log(message.member.voice.channel.name)
        console.log(message.member.voice.channel.id)
        fetch(`https://discord.com/api/v9/channels/${message.member.voice.channel.id}/invites`, {
            method: "POST",
            body: JSON.stringify({
                max_age: 86400,
                max_uses: 10,
                target_application_id: "755600276941176913",
                // target_application_id: "773336526917861400", //betrayal
                // target_application_id: "755827207812677713", //poker
                // target_application_id: "814288819477020702", //fishing
                target_type: 2,
                temporary: false,
                validate: null
            }),
            headers: {
                "Authorization": `Bot ${process.env.token}`,
                "Content-Type": "application/json"
            }
        }).then(res => res.json())
            .then(invite => {
                console.log(invite)
                if (!invite.code) return message.reply(":x: Cannot start minigame")
                message.channel.send(`Click on the Link to start the GAME:\n> https://discord.gg/${invite.code}`)
            })
    },
};