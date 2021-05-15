const client = require('nekos.life');
const Discord = require('discord.js')
const neko = new client();

module.exports.run = (client, msg, message, args) => {
  var errMessage = "Это не канал NSFW!";
  if (!message.channel.nsfw) {
      message.react('💢');

      return message.reply(errMessage)
      .then(msg => {
      msg.delete({ timeout: 3000 })
      })
      
  }

        async function work() {
        let owo = (await neko.nsfw.anal());

        const anal = new Discord.MessageEmbed()
        .setTitle("2D анал")
        .setImage(owo.url)
        .setColor(`#FF0000`)
        .setURL(owo.url);
        message.channel.send(anal);

}

      work();
}

                module.exports.help = {
                  name: "2danal",
                  description:
                        "Эта команда используется для вызова API изображений NSFW для их отправки, но необходим канал NSFW.",
                  usage: "anal",
                  accessablechannel: "NSFW Channel",
                  accessableby: "NSFW/Member",
                  aliases: [],
            };