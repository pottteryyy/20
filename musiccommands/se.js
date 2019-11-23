const search = require('yt-search');

exports.run = (client, message, args, ops) => {

    message.delete();

    search(args.join(' '), function (err, res) {

        if (err) return message.channel.send('มีบางอย่างผิดปกติ').then( msg => msg.delete(5000));

        let videos = res.videos.slice(0, 5);

        let resp = ' ';

        for (var i in videos) {

          resp += `${parseInt(i) + 1} \`${videos[i].title}\`\n`;

        }

        resp += `\nเลือกหมายเลขระหว่าง \`1-${videos.length}\`\n`;

        message.channel.send(resp);

        const filter = m => !isNaN(m.content) && m.content < videos.length + 1 && m.content > 0 && m.author.id === message.author.id;

        const collector = message.channel.createMessageCollector(filter);

        collector.videos = videos;

        collector.once('collect', function (m) {

            let commandFile = require('./play.js');

            commandFile.run(client, message, [this.videos[parseInt(m.content) - 1].url], ops);

            collector.cleanup();

        });

    });

}
