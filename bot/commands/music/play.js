exports.run = async (Client, message, args) => {
    const Discord = require("discord.js")
    const embed = new Discord.MessageEmbed()
    embed
    if (!message.member.voice.channel) return embed.setAuthor("Join a VC First!", `${message.author.displayAvatarURL()}`), message.channel.send(embed)
    if (!args[0]) return embed.setAuthor("Correct Usage - Play genre [genre] OR Play station [station]", `${message.author.displayAvatarURL()}`), message.channel.send(embed)
    if (args[0].toLowerCase() == "genre") {
        let genres = Client.music.stations.map(channels => channels[3].toLowerCase())
        args = args.splice(1, args.length)
        if (!args[0]) return embed.setAuthor("Please include the genre you'd like to hear!", `${message.author.displayAvatarURL()}`), message.channel.send(embed)
        else if (!genres.includes(args.join(" ").toLowerCase())) return embed.setAuthor("That genre is unavailable.", `${message.author.displayAvatarURL()}`), message.channel.send(embed)
        else {
            var channelList = Client.music.stations.filter(channel => channel[3].toLowerCase() == args.join(" ").toLowerCase())
            Client.music.servers.play(channelList[Math.floor(Math.random() * channelList.length)], message)
        }
    } else if (args[0].toLowerCase() == "station") {
        if (!args[1]) return embed.setAuthor(`Please include the station you'd like to hear!`, `${message.author.displayAvatarURL()}`), message.channel.send(embed)
        args = args.splice(1, args.length)
        var selected = Client.music.stations.filter(channel => channel[0].toLowerCase().includes(args.join(" ").toLowerCase()))
        if (!selected[0]) return embed.setAuthor(`Unable to find that station, sorry!`, `${message.author.displayAvatarURL()}`), message.channel.send(embed)
        else Client.music.servers.play(selected[0], message)
    } else if(args[0].toLowerCase() == "manual") {
        if(!args[1]) return embed.setAuthor(`You must specify a supported stream URL!`, `${message.author.displayAvatarURL()}`), message.channel.send(embed)
        Client.music.servers.play(["Manual", args[1], 0, "Unknown"], message)
    } else return embed.setAuthor(`Specify genre [genre], station [station] or manual [stream]`, `${message.author.displayAvatarURL()}`), message.channel.send(embed)
}

exports.help = {
    name: 'play',
    aliases: ["p"],
    category: 'Music',
    description: "plays a station or genre!"
};