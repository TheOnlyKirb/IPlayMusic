exports.run = async (Client, message, args) => {
    return message.channel.send(`:ping_pong: ${Math.floor(Client.ws.ping)}ms`)
}

exports.help = {
    name: 'ping',
    aliases: ["pong", "bong"],
    category: 'General',
    description: "Ping pong!"
};