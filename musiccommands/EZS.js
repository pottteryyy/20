exports.run = async (client, message, args, ops) => {
    
    if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send('ขออภัยคุณไม่มีสิทธิ์ในการใช้ forceskip คุณจะต้องมี permission manage message ถึงจะสามารถใช้คำสั่งนี้ได้ :)');

    let fetched = ops.active.get(message.guild.id);

    if (!fetched) return message.channel.send('ขณะนี้ไม่มีเพลงที่เล่นอยู่')

    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('คุณไม่ได้เชื่อมต่อห้องเดียวกันกับบอท');

    ops.active.set(message.guild.id, fetched);

    message.channel.send('ทำการข้ามเพลงเรียบร้อยแล้ว');

    return fetched.dispatcher.end();

}
