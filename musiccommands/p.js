﻿const ytdl = require('ytdl-core');

exports.run = async (client, message, args, ops) => {

    if (!message.member.voiceChannel) return message.channel.send('โง่ไม่เข้าห้องคุยละไอส้ส');

    if (!args[0]) return message.channel.send('อย่าลืมใส่ลิ้งค์ด้วย ok');

    let validate = await ytdl.validateURL(args[0]);

    if (!validate) {

        let commandFile = require(`./search.js`);

        return commandFile.run(client, message, args, ops);

    }

    let info = await ytdl.getInfo(args[0]);

    let data = ops.active.get(message.guild.id) || {};

    if (!data.connection) data.connection = await message.member.voiceChannel.join();

    if (!data.queue) data.queue = [];

    data.guildID = message.guild.id;

    data.queue.push({
        songTitle: info.title,
        requester: message.author.tag,
        url: args[0],
        announceChannel: message.channel.id
    });

    if (!data.dispatcher) play(client, ops, data);

    else {

        message.channel.send(`เพิ่มเพลง ${info.title} ลงในคิวเรียบร้อยแล้ว |
		คนขอเพลงนี้ @${message.author.tag} `);

    }

    ops.active.set(message.guild.id, data);

}

async function play(client, ops, data) {

    client.channels.get(data.queue[0].announceChannel).send(`ขณะนี้กำลังเล่นเพลง ${data.queue[0].songTitle} | 
คนขอเพลงนี้ @${data.queue[0].requester} `)

    data.dispatcher = await data.connection.playStream(ytdl(data.queue[0].url, {
        filter: 'audioonly',
		highWaterMark: 1024 * 1024 * 10
		}));

    data.dispatcher.guildID = data.guildID;

    data.dispatcher.once('end', function () {

        end(client, ops, this);

    });

}

function end(client, ops, dispatcher) {

    let fetched = ops.active.get(dispatcher.guildID);

    fetched.queue.shift();

    if (fetched.queue.length > 0) {

        ops.active.set(dispatcher.guildID, fetched);

        play(client, ops, fetched);

    } else {

        ops.active.delete(dispatcher.guildID);

        let vc = client.guilds.get(dispatcher.guildID).me.voiceChannel;

        if (vc) vc.leave();

    }

}
