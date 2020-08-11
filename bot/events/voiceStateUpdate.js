exports.run = async (Client, oldState, newState) => { // on event run, take the client we passed in earlier and use it
    const Discord = require("discord.js")
    const embed = new Discord.MessageEmbed()
    if (oldState.channelID && Client.music.servers.get(oldState.guild.id) && oldState.channelID == Client.music.servers.get(oldState.guild.id).vc && Client.channels.cache.get(oldState.channelID).members.map(members => members.id).length == 1) {
        embed.setAuthor("All members have left the VC! I'll leave too!", `${Client.user.displayAvatarURL()}`)
        Client.channels.cache.get(Client.music.servers.get(oldState.guild.id).spawnedChannel).send(embed)
        Client.music.servers.get(oldState.guild.id).dispatcher.disconnect()
        return Client.music.servers.delete(oldState.guild.id)
    }
}