const {RichEmbed} = require('discord.js');
const {caseNumber} = require('../util/caseNumber.js');
const {parseUser} = require('../util/parseUser.js');
const settings = require('../settings.json');
exports.run = async (client, message, args) => {
  const user = message.mentions.users.first();
  parseUser(message, user);
  const modlog = client.channels.find(channel => channel.name === "mod-log");
  const caseNum = await caseNumber(client, modlog);
  const muteRole = client.guilds.get(message.guild.id).roles.find(channel => channel.name === "mod-log");
  if (!modlog) return message.reply('Err').catch(console.error);
  if (!muteRole) return message.reply('Err. Rol no encontrado.').catch(console.error);
   if (!message.guild.member(client.user).hasPermission('MEMBERS_KICK')) return message.reply('Permisos insuficientes.').catch(console.error);
  if (message.mentions.users.size < 1) return message.reply('debes mencionar a alguien.').catch(console.error);
  const reason = args.splice(1, args.length).join(' ') || `esperando confirmacion. Use ${settings.prefix}reason ${caseNum} <reason>.`;

  const embed = new RichEmbed()
    .setColor(0x00AE86)
    .setTimestamp()
    .setDescription(`**Accion:** Un/mutear\n**Victima:** ${user.tag}\n**Autor:** ${message.author.tag}\n**Motivo:** ${reason}`)
    .setFooter(`Caso ${caseNum}`);

  if (!message.guild.member(client.user).hasPermission('MANAGE_ROLES_OR_PERMISSIONS')) return message.reply('Permisos insuficientes.').catch(console.error);

  if (message.guild.member(user).roles.has(muteRole.id)) {
    message.guild.member(user).removeRole(muteRole).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    });
  } else {
    message.guild.member(user).addRole(muteRole).then(() => {
      client.channels.get(modlog.id).send({embed}).catch(console.error);
    });
  }

};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: ['unmute'],
  permLevel: 2
};

exports.help = {
  name: 'mute',
  description: 'mutes or unmutes a mentioned user',
  usage: 'un/mute [mention] [reason]'
};
