exports.run = (client, message, args, ops) => {

    let fetched = ops.active.get(message.guild.id);

    if (isNaN(args[0]) || args[0] > 150 || args[0] < 0) return message.channel.send('ใส่ระดับความดังระหว่าง 0-150');

    fetched.dispatcher.setVolume(args[0]/150);

    message.channel.send(`เปลี่ยนระดับความดับเรียบร้อยแล้ว`)

}