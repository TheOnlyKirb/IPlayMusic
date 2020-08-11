exports.run = async (Client, message, args) => {
    const Discord = require("discord.js")
    const embed = new Discord.MessageEmbed()
    if(!Client.music.servers.get(message.guild.id)) return embed.setAuthor("I'm not currently playing anything!", `${message.author.displayAvatarURL()}`), message.channel.send(embed)
    if(Client.music.servers.get(message.guild.id).lastRequest > Date.now()) return embed.setAuthor(`Please wait ${Math.floor(Client.music.servers.get(message.guild.id).lastRequest-Date.now())/1000} seconds before checking again.`, `${message.author.displayAvatarURL()}`), message.channel.send(embed)
    const streamLatest = await Client.music.getStation(Client.music.servers.get(message.guild.id).station)
    const title = streamLatest.source[Client.music.servers.get(message.guild.id).station[2]].title 
    embed.setAuthor(`Playing Station ${Client.music.servers.get(message.guild.id).station[0]}`, `${message.author.displayAvatarURL()}`)
    embed.setDescription("🎵 Songs can be checked every 15 seconds!")
    embed.addField("Current Track", `${title ? title : "Unknown"}`)
    message.channel.send(embed)
    return Client.music.servers.get(message.guild.id).lastRequest = Date.now()+15000
}
exports.help = {
    name: "np",
    aliases: ["nowplaying"],
    category: "Music",
    description: "Fetches the song playing"
};