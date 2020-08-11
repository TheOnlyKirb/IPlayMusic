exports.run = async (Client, message, args) => {
    const Discord = require("discord.js")
    const embed = new Discord.MessageEmbed()
    if(!Client.music.servers.get(message.guild.id)) return embed.setAuthor("I'm not currently playing anything!", `${message.author.displayAvatarURL()}`), message.channel.send(embed)
    if(message.author.id !== Client.music.servers.get(message.guild.id).userControl.id && !message.member.hasPermission("MANAGE_GUILD")) return embed.setAuthor(`${Client.music.servers.get(message.guild.id).userControl.tag} controls the audio right now.`, `${message.author.displayAvatarURL()}`), message.channel.send(embed)
    if(!args[0] || isNaN(args[0] || args[0] < 1 || args[0] > 200)) return embed.setAuthor("Volume Specified must be between 1-200", `${message.author.displayAvatarURL()}`), message.channel.send(embed)
    Client.music.servers.get(message.guild.id).player.setVolume(args[0]/100)
    embed.setAuthor(`Volume set to ${Math.floor(args[0])}%`, `${message.author.displayAvatarURL()}`), message.channel.send(embed)
}
exports.help = {
    name: "volume",
    aliases: ["v"],
    category: "Music",
    description: "Adjusts player volume"
};