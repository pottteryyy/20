exports.run = (client, message, args, ops) => {

    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('คุณจะต้องมี Admin ถึงจะสามารถใช้คำสั่งนี้ได้ :)');
    
    if (message.guild.me.voiceChannelID !== message.member.voiceChannelID) return message.channel.send('คุณไม่ได้อยู่เดียวกันกับบอท')
    
    if (!message.guild.me.voiceChannel) return message.channel.send('ขออภัยด้วยขณะนีบอทไม่ได้อยู่ในห้อง')

    message.guild.me.voiceChannel.leave();

    message.channel.send('บอทได้ออกจากห้องไปแล้ว');

}