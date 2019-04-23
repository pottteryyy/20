const Discord = require('discord.js');

const client = new Discord.Client();

const active = new Map();

const config = require("./config/musicbot.json");


client.on('message', async message => {

    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

    let cmd = args.shift().toLowerCase();

    if (message.author.bot) return;

    if (!message.content.startsWith(config.prefix)) return;
	
    try {

        delete require.cache[require.resolve(`./musiccommands/${cmd}.js`)];

        let ops = {
            ownerID: config.ownerID,
            active: active
        }

        let commandFile = require(`./musiccommands/${cmd}.js`);

        commandFile.run(client, message, args, ops);

    } catch (e) {

        console.log(e.stack);

    }

});

client.on('ready', () => {

    console.log('Bot has been started!!!!!!!!!!');

});

client.on('ready', () => {
	
	client.user.setPresence({ game: { name: `=help for help`, type: "Watching"}}); 
	
});

const token = config.token;

client.login(token);