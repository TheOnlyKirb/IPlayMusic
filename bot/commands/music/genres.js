exports.run = async (Client, message, args) => {
    const Discord = require("discord.js")
    const embed = new Discord.MessageEmbed()
    embed.setAuthor("Available Genres", `${message.author.displayAvatarURL()}`)
    embed.setDescription("🎹 These are the available Genres to listen to!")
    embed.addField("Genre List", `\`${[...new Set(Client.music.stations.map(stations => stations[3]))].join("\`, \`")}\``)
    message.channel.send(embed)
}
exports.help = {
    name: 'genres',
    aliases: ["genrelist"],
    category: 'Music',
    description: "Lists available genres"
};