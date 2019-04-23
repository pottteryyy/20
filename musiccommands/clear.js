exports.run = (client, message, args, ops) => {

    message.delete();
	
	if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.reply(`You don't have "manage message" permission!`).then( msg => msg.delete(3000));

    if (isNaN(args[0])) return message.channel.send('').then(msg => msg.delete(3000));

    if (args[0] > 100) return message.channel.send(`BOT can't delete message more than 100 message`).then( msg => msg.delete(3000));

    message.channel.bulkDelete(args[0]).then(  messages => message.reply(`Deleted ${messages.size} message(s) ( this message will remove in 3 second)`).then( msg => msg.delete(3000)));

}