exports.run = (client, message) => {
   if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Permisos insuficientes.').catch(console.error);
  message.channel.send('Cargando...')
    .then(msg => {
      msg.edit(`@here REMAKE / ALL!`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'rmk',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 'rmk'
};
