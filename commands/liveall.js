exports.run = (client, message) => {
 let args = message.content.split(" ").slice(1)
 let space = message.content.split("").slice(1)
  if (!message.guild.member(client.user).hasPermission('KICK_MEMBERS')) return message.reply('Permisos insuficientes.').catch(console.error);
  message.channel.send('Cargando...')
    .then(msg => {
      msg.edit(`@here LIVE [${args}] resto RMK`);
    });
};

exports.conf = {
  enabled: true,
  guildOnly: false,
  aliases: [],
  permLevel: 0
};

exports.help = {
  name: 'liver',
  description: 'Ping/Pong command. I wonder what this does? /sarcasm',
  usage: 'liver'
};
