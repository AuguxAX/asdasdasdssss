exports.run = (client, message, args) => {
   if (!message.guild.member(client.user).hasPermission('BAN_MEMBERS')) return message.reply('Permisos insuficientes.').catch(console.error);
  const messagecount = parseInt(args.join(' '));
  message.channel.fetchMessages({
    limit: messagecount
  }).then(messages => message.channel.bulkDelete(messages));
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 'purge',
  description: 'Purges X amount of messages from a given channel.',
  usage: 'purge <number>'
};
