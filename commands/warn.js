const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  parseUser(message, user);
  const modlog = client.channels.find(channel => channel.name === "mod-log");
  const caseNum = await caseNumber(client, modlog);
  if (!modlog) return message.reply('Err');
  if (message.mentions.users.size < 1) return message.reply('Debes mencionar a alguien!').catch(console.error);
   if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Permisos insuficientes.').catch(console.error);

  const reason = args.splice(1, args.length).join(' ') || `aguardando por confirmacion. Use ${settings.prefix}rason ${caseNum} <reason>.`;
  const embed = new RichEmbed()
  .setColor(0x00AE86)
  .setTimestamp()
  .setDescription(`**Accion:** Advertencia\n**Victima:** ${user.tag}\n**Autor:** ${message.author.tag}\n**Motivo:** ${reason}`)
  .setFooter(`Caso ${caseNum}`);
  return client.channels.get(modlog.id).send({embed});
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'warn',
  description: 'Issues a warning to the mentioned user.',
  usage: 'warn [mention] [reason]'
};
