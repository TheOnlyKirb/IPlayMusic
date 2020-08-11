exports.run = (Client, message) => {
    if (!message.guild || message.IsPrivate || message.author.bot) return;
    const prefix = [Client.config.prefix, `<@!${Client.user.id}>`].find(p => message.content.toLowerCase().indexOf(p) === 0)
    if (!prefix) return;
    const args = message.content.slice(prefix.length).trim().split(/ +/g)
    let command = args.shift().toLowerCase();
    if (Client.commands.has(command)) command = Client.commands.get(command)
    else if (Client.aliases.has(command)) command = Client.commands.get(Client.aliases.get(command))
    if (!command.run) return;
    command.run(Client, message, args).catch(error => {
        if (error) return console.error(error)
    })
}