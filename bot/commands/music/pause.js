exports.run = async (Client, message, args) => {
    const Discord = require("discord.js")
    const embed = new Discord.MessageEmbed()
    if(!Client.music.servers.get(message.guild.id)) return embed.setAuthor("I'm not currently playing anything!", `${message.author.displayAvatarURL()}`), message.channel.send(embed)
    if(message.author.id !== Client.music.servers.get(message.guild.id).userControl.id && !message.member.hasPermission("MANAGE_GUILD")) return embed.setAuthor(`${Client.music.servers.get(message.guild.id).userControl.tag} controls the audio right now.`, `${message.author.displayAvatarURL()}`), message.channel.send(embed)
    if(Client.music.servers.get(message.guild.id).player.paused) return embed.setAuthor(`I'm already paused! Try resuming!`, `${message.author.displayAvatarURL()}`), message.channel.send(embed)
    Client.music.servers.get(message.guild.id).player.pause()
    embed.setAuthor(`Paused! I'll be here when you want to resume.`, `${message.author.displayAvatarURL()}`), message.channel.send(embed)
}
exports.help = {
    name: "pause",
    aliases: ["pa"],
    category: "Music",
    description: "Pauses playback"
};