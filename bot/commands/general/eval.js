exports.run = async (Client, message, args) => {
  if (message.author.id !== Client.config.owner) return;
  const fs = require("fs")
  var Discord = require("discord.js");
  var embed = new Discord.MessageEmbed()
  function clean(text) {
    if (typeof (text) === "string")
      return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else
      return text;
  }
  try {
    var evalmsg = message.channel.send(`:floppy_disk: \`Processing\``)
    const code = args.join(" ");
    let evaled = eval(code);
    if (typeof evaled !== "string")
      evaled = require("util").inspect(evaled);
    evalmsg.then(m => m.edit(
      embed
        .setAuthor(`Eval`, `${Client.user.displayAvatarURL()}`)
        .addField("Input:", `\n\`\`\`js\n${args.join(" ")}\`\`\``, false)
        .addField("Output:", `\n\`\`\`xl\n${clean(evaled)}\`\`\``, false)
        .setFooter(`Successful | Took ${m.createdTimestamp - message.createdTimestamp}ms`)));
  } catch (err) {
    evalmsg.then(m => m.edit(
      embed
        .setAuthor(`Eval`, `${Client.user.displayAvatarURL()}`)
        .addField("Input:", `\n\`\`\`js\n${args.join(" ")}\`\`\``, false)
        .addField("Output:", `\`\`\`xl\n${clean(err)}\n\`\`\``, false)
        .setFooter(`Failed => ERR | Took ${m.createdTimestamp - message.createdTimestamp}ms`)));
  }
};
exports.help = {
  name: 'eval',
  aliases: [],
  category: 'General',
  description: 'evals code'
};