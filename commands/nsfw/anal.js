const discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = (client, msg, args) => {
	if (msg.channel.nsfw === true) {
		superagent
			.get("https://nekobot.xyz/api/image")
			.query({ type: "anal" })
			.end((err, response, body) => {
				let emb = new discord.MessageEmbed()
					.setImage(response.body.message)
					.setColor("#00ff00")
					.setTitle("Anal Тут")
					.setFooter(
						`©2021 Mangal⚙ | Эта команда запрошена ${msg.author.username}#${msg.author.discriminator}`
					);

				msg.channel.send(emb);
			});
	} else {
		msg.channel.send("Это не канал NSFW!");
	}
};

module.exports.help = {
	name: "anal",
	description:
		"Эта команда используется для вызова API изображений NSFW для их отправки, но необходим канал NSFW.",
	usage: "anal",
	accessablechannel: "NSFW Channel",
	accessableby: "NSFW/Member",
	aliases: [],
};
