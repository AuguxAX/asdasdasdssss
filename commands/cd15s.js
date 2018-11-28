exports.run = (client, message) => {
 let minutes = message.content.split(" ").slice(1)
 let space = message.content.split("").slice(1)
  if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Permisos insuficientes.').catch(console.error);
  message.channel.send('Cargando...')
    .then(msg => {
      msg.edit(`@here Scrim comenzando en **${minutes}** segundos!`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 2
};

exports.help = {
  name: 's',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 's [time]'
};
