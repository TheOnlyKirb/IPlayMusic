exports.run = async (Client, message, args) => {
    const Discord = require("discord.js")
    const embed = new Discord.MessageEmbed()
    if (!args[0]) {
        embed.setAuthor("Available Stations", `${message.author.displayAvatarURL()}`)
        embed.setDescription("🎹 These are the available Stations to listen to!")
        embed.addField("Stations List", `\`${Client.music.stations.map(stations => stations[0]).join("\`, \`")}\``)
        message.channel.send(embed)
    } else if(args[0].toLowerCase() == "info") {
        if(!args[1]) return embed.setAuthor("You must provide a station to lookup!", `${message.author.displayAvatarURL()}`), message.channel.send(embed)
        args = args.splice(1, args.length)
        var station = Client.music.stations.filter(channel => channel[0].toLowerCase() == args.join(" ").toLowerCase())[0]
        if(!station[0]) return embed.setAuthor("Unknown station. Sorry I couldn't find anything!", `${message.author.displayAvatarURL()}`), message.channel.send(embed)
        embed.setAuthor(`${station[0]}`, `${message.author.displayAvatarURL()}`)
        embed.setDescription(`${station[6]}`)
        embed.addField("Website", `${station[4]}`, true)
        if(station[5]) embed.addField("Donate", `${station[5]}`, true)
        embed.addField("Genre", `${station[3]}`, true)
        return message.channel.send(embed)
    } else return embed.setAuthor("Unknown request. Did you mean 'station info [station]'?", `${message.author.displayAvatarURL()}`), message.channel.send(embed)
}
exports.help = {
    name: 'stations',
    aliases: ["stationlist"],
    category: 'Music',
    description: "Lists available stations and station specifics"
};