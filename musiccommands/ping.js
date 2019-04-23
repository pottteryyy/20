exports.run = (client, message, args, ops) => {

    message.delete();

    message.channel.send('Ping ' + Math.round(client.ping) + ' ms!').then( msg => msg.delete(3000));

}