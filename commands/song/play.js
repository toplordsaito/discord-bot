const ytdl = require("ytdl-core");

module.exports = {
  name: "play",
  description: "Play a song in your channel!",
  async execute(message) {
    try {
      const args = message.content.split(" ");
      const queue = message.client.queue;
      const serverQueue = message.client.queue.get(message.guild.id);

      const voiceChannel = message.member.voice.channel;
      if (!voiceChannel)
        return message.channel.send(
          "You need to be in a voice channel to play music!"
        );
      const permissions = voiceChannel.permissionsFor(message.client.user);
      if (!permissions.has("CONNECT") || !permissions.has("SPEAK")) {
        return message.channel.send(
          "I need the permissions to join and speak in your voice channel!"
        );
      }

      const songInfo = await ytdl.getInfo(args[1]);
      const song = {
        title: songInfo.videoDetails.title,
        url: songInfo.videoDetails.video_url
      };

      if (!serverQueue) {
        if (!message.client.setting.get(message.guild.id)){
          const settingContruct = {
            auto_play: true
          }
          message.client.setting.set(message.guild.id, settingContruct)
        }
        const queueContruct = {
          textChannel: message.channel,
          voiceChannel: voiceChannel,
          connection: null,
          songs: [],
          volume: 5,
          playing: true,
          last_song: "",
        };
        queue.set(message.guild.id, queueContruct);
        queueContruct.songs.push(song);
        try {
          var connection = await voiceChannel.join();
          queueContruct.connection = connection;
          this.play(message, queueContruct.songs[0]);
        } catch (err) {
          console.log(err);
          queue.delete(message.guild.id);
          return message.channel.send(err);
        }
      } else {
        serverQueue.songs.push(song);
        return message.channel.send(
          `${song.title} has been added to the queue!`
        );
      }
    } catch (error) {
      console.log(error);
      message.channel.send(error.message);
    }
  },

  async play(message, song) {
    const queue = message.client.queue;
    const setting = message.client.setting;

    const guild = message.guild;
    const serverQueue = queue.get(message.guild.id);
    const serverSetting = setting.get(message.guild.id);

    if (!song) {
      if (serverSetting.auto_play) {
        console.log("starting random. . .")
        const old_song = await ytdl.getInfo(serverQueue.last_song.url);
        const related_songs = old_song.related_videos
        const random_song = related_songs[Math.floor(Math.random() * related_songs.length)];
        const songInfo = await ytdl.getInfo(random_song.id)
        song = {
          title: songInfo.videoDetails.title,
          url: songInfo.videoDetails.video_url
        };
        serverQueue.songs.push(song);
        message.channel.send(
          `(auto-add) ${song.title} has been added to the queue!`
        );
        console.log("song : ", song.title)
        console.log("ending random. . .")
      } else {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
      }
    }
    serverQueue.last_song = song
    const dispatcher = serverQueue.connection
      .play(ytdl(song.url))
      .on("finish", () => {
        serverQueue.songs.shift();
        this.play(message, serverQueue.songs[0]);
      })
      .on("error", error => console.error(error));
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
    serverQueue.textChannel.send(`Start playing: **${song.title}**`);
  },

};
