exports.run = async (Client, message, args) => {
    const Discord = require("discord.js")
    const embed = new Discord.MessageEmbed()
    if(!Client.music.servers.get(message.guild.id)) return embed.setAuthor("I'm not currently playing anything!", `${message.author.displayAvatarURL()}`), message.channel.send(embed)
    if(message.author.id !== Client.music.servers.get(message.guild.id).userControl.id && !message.member.hasPermission("MANAGE_GUILD")) return embed.setAuthor(`${Client.music.servers.get(message.guild.id).userControl.tag} controls the audio right now.`, `${message.author.displayAvatarURL()}`), message.channel.send(embed)
    Client.music.servers.get(message.guild.id).dispatcher.disconnect()
    embed.setAuthor(`Alright, I've stopped and left the channel. See you later!`, `${message.author.displayAvatarURL()}`), message.channel.send(embed)
    return Client.music.servers.delete(message.guild.id)
}

exports.help = {
    name: 'stop',
    aliases: ["leave", "s"],
    category: 'Music',
    description: "Stops playback"
};