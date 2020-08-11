exports.run = async (Client, message, args) => {
    const Discord = require("discord.js")
    let embed = new Discord.MessageEmbed(), commands = Array.from(Client.commands)
    if (args[0] && commands.filter(c => c[1].help.name.toLowerCase() == args[0].toLowerCase()).length > 0) {
        let commandFound = commands.filter(c => c[1].help.name == args[0].toLowerCase())[0][1].help
        embed.addField(`Command Description - ${commandFound.name.substr(0, 1).toUpperCase() + commandFound.name.substr(1)}`, `${commandFound.description}\n`)
        if (commandFound.aliases.length > 0) embed.addField(`Command Aliases`, `\`${commandFound.aliases.join("\`, \`")}\``)
    } else for (let i = 0; i < Client.commands.categories.length; i++) embed.addField(Client.commands.categories[i], `\`${commands.filter(c => c[1].help.category == Client.commands.categories[i]).map(c => c[1].help.name).join("\`, \`")}\``)
    message.channel.send(embed)
}
exports.help = {
    name: 'help',
    aliases: ["h"],
    category: 'General',
    description: 'It shows the help page'
};