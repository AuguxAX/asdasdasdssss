const Discord = require('discord.js');
exports.run = (client, message, args) => {
  let reason = args.slice(1).join(' ');
  let user = message.mentions.users.first();
  let modlog = client.channels.find(channel => channel.name === "mod-log");
  if (!modlog) return message.reply('Err');
  if (reason.length < 1) return message.reply('Debes dar una razon!.');
  if (message.mentions.users.size < 1) return message.reply('Debes mencionar a alguien.').catch(console.error);

  if (!message.guild.member(client.user).hasPermission('MEMBER_BAN')) return message.reply('Permisos insuficientes.').catch(console.error);

  if (!message.guild.member(user).bannable) return message.reply('Imposible prohibir a esta persona');
  message.guild.ban(user, 2);

  const embed = new Discord.RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Accion:** Prohibicion\n**Victima:** ${user.tag}\n**Autor:** ${message.author.tag}\n**Motivo:** ${reason}`);
  return client.channels.get(modlog.id).send(embed);
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'ban',
  description: 'Bans the mentioned user.',
  usage: 'ban [mention] [reason]'
};
