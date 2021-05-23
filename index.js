const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
require("dotenv").config();

setInterval(async () => {
  await fetch("https://kordz.glitch.me").then(console.log("Pinged!"));
}, 240000);

const client = new Discord.Client();
const config = {
  token: process.env.TOKEN,
  prefix: process.env.PREFIX
};
client.config = config;
client.queue = new Map();

client.on('ready', () => {
console.log(`Logged in as ${client.user.tag}!`);
console.log("BotFlash")

fs.readdir("./events/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    const event = require(`./events/${file}`);
    let eventName = file.split(".")[0];
    client.on(eventName, event.bind(null, client));
  });
});

client.commands = new Discord.Collection();

fs.readdir("./commands/", (err, files) => {
  if (err) return console.error(err);
  files.forEach(file => {
    if (!file.endsWith(".js")) return;
    let props = require(`./commands/${file}`);
    let commandName = file.split(".")[0];
    console.log(`[Command Manager]: Loading Command ${commandName}`);
    client.commands.set(commandName, props);
  });
});
  
client.user.setActivity(`k+help`, {
type: "WATCHING",
url: "https://google.com"})
    .then(presence => console.log(`Your Status has been set to  ${presence.game ? presence.game.none : 'k+Help'}`))
    .catch(console.error);
});

client.login(client.config.token);


oolalala