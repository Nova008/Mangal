const discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = (client, msg, args) => {
	if (msg.channel.nsfw === true) {
		superagent
			.get("https://nekobot.xyz/api/image")
			.query({ type: "4k" })
			.end((err, response, body) => {
				let emb = new discord.MessageEmbed()
					.setImage(response.body.message)
					.setColor("#00ff00")
					.setTitle("4K NSFW тут")
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
	name: "4knsfw",
	description: "Эта команда используется для создания некоторых образов 4knsfw.",
	usage: "4knsfw",
	accessableby: "NSFW/Member",
	aliases: [],
};
