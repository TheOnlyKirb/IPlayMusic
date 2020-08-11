module.exports = (Client) => {
    const fetch = require("node-fetch")
    Client.music = {}
    Client.music.stations = []
    Client.music.servers = new Map()
    Client.music.getStation = async function getStation(station) {
        var foundStation = {}
        await fetch(`${(station[1].split("/")[0]).includes("https") ? "https" : "http"}://${station[1].split("/")[2]}/status-json.xsl`).then(res => res.json()).then(json => {
            if (!json.icestats.source) foundStation = false;
            else if (!json.icestats.source[0]) json.icestats.source = [json.icestats.source]
            foundStation = json.icestats
        }).catch(err => {
            //console.log(err)
            foundStation = false
        })
        return foundStation;
    }
    Client.music.servers.recordPlayback = function tracker(data, station) {
        Client.music.servers.set(data.guild.id, {
            guild: data.guild,
            spawnedChannel: data.summoned,
            station: station,
            vc: data.vc,
            dispatcher: data.dispatcher,
            player: data.player,
            userControl: data.user,
            lastRequest: Date.now() + 15000
        })
    }
    Client.music.servers.play = async function playStation(station, message) {
        const Discord = require("discord.js")
        const embed = new Discord.MessageEmbed()
        var songDetails = await Client.music.getStation(station)
        if (!songDetails) return embed.setAuthor(`Incompatible Stream, ensure the stream is powered by IceCast or SHOUTcast.`, `${message.author.displayAvatarURL()}`), message.channel.send(embed)
        const bitrate = (songDetails.source[station[2]].bitrate) ? songDetails.source[station[2]].bitrate : (songDetails.source[station[2]].audio_bitrate) ? songDetails.source[station[2]].audio_bitrate : "Unknown"
        if (Client.music.servers.get(message.guild.id) && message.author.id !== Client.music.servers.get(message.guild.id).userControl.id && !message.member.hasPermission("MANAGE_GUILD")) return embed.setAuthor(`${Client.music.servers.get(message.guild.id).userControl.tag} controls the audio right now.`, `${message.author.displayAvatarURL()}`), message.channel.send(embed)
        else {
            message.member.voice.channel.join().then(async connection => {
                const player = Client.music.servers.get(message.guild.id) ? Client.music.servers.get(message.guild.id).dispatcher.play(`${station[1]}`, { bitrate: "auto" }) : connection.play(`${station[1]}`, { bitrate: "auto" })
                Client.music.servers.recordPlayback({ guild: message.guild, dispatcher: connection, user: message.author, player: player, summoned: message.channel.id, vc: message.member.voice.channel.id }, station)
            })
        }
        embed.setAuthor("🎵 Playback Beginning 🎵", `${message.author.displayAvatarURL()}`)
        embed.addField(`Station`, `${station[0] == "Manual" ? songDetails.source[station[2]].server_name : station[0]}`, true)
        embed.addField(`Station Genre`, `${songDetails.source[station[2]].genre ? songDetails.source[station[2]].genre : station[3]}`, true)
        embed.addField(`Stream Location`, `${songDetails.location}`, true)
        embed.addField(`Audio Bitrate`, `${bitrate}`, true)
        embed.addField(`Listeners`, `${songDetails.source[station[2]].listeners ? songDetails.source[station[2]].listeners : "Just you!"}`, true)
        embed.addField(`Current Song`, `${songDetails.source[station[2]].title ? songDetails.source[station[2]].title : "Unknown"}`, true)
        return message.channel.send(embed)
    }
}