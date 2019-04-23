exports.run = async (client, message, args, ops) => {
    
    let fetched = ops.active.get(message.guild.id);

    if (!fetched) return message.channel.send('ขณะนี้ไม่มีเพลงที่เล่นอยู่')
    
    if (message.member.voiceChannel !== message.guild.me.voiceChannel) return message.channel.send('คุณไม่ได้เชื่อมต่อห้องเดียวกันกับบอท');

    let userCount = message.member.voiceChannel.members.size;

    let required = Math.ceil(userCount/2);

    if (!fetched.queue[0].voteSkips) fetched.queue[0].voteSkips = [];

    if (fetched.queue[0].voteSkips.includes(message.member.id)) return message.channel.send(`ขออภัยด้วยคุณได้ทำการโหวตข้ามไปแล้ว จำนวนการโหวต ${fetched.queue[0].voteSkips.length} ต้องการจำนวนโหวต ${require}`);

    fetched.queue[0].voteSkips.push(message.member.id);

    ops.active.set(message.guild.id, fetched);

    message.channel.send(`คุณได้ทำการโหวตเพื่อข้ามเพลงแล้ว จำนวนการโหวต ${fetched.queue[0].voteSkips.length} ต้องการจำนวนโหวต ${required}`)

    if (fetched.queue[0].voteSkips.length >= required){

        message.channel.send('ทำการข้ามเพลงเรียบร้อยแล้ว');

        return fetched.dispatcher.end();

    }

}