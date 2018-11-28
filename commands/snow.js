exports.run = (client, message) => {
   if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Permisos insuficientes.').catch(console.error);
  message.channel.send('Cargando...')
    .then(msg => {
      msg.edit(`@here SCRIM COMENZANDO AHORA!`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'now',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 'now'
};
