const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find(channel => channel.name === "mod-log");
  if (!modlog) return message.reply('Err');
  if (reason.length < 1) return message.reply('Debes dar una razon!.');
  if (message.mentions.users.size < 1) return message.reply('Debes mencionar a alguien.').catch(console.error);
   if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Permisos insuficientes.').catch(console.error);

  if (!message.guild.member(user).kickable) return message.reply('Imposible expulsar a esta persona');
  message.guild.member(user).kick();

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Accion:** Expulsion\n**Victima:** ${user.tag}\n**Autor:** ${message.author.tag}\n**Motivo:** ${reason}`)
  return client.channels.get(modlog.id).send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'kick',
  description: 'Kicks the mentioned user.',
  usage: 'kick [mention] [reason]'
};
