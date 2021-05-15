const discord = require("discord.js");
const superagent = require("superagent");

exports.run = (client, msg, args) => {
	if (msg.channel.nsfw === true) {
		superagent
			.get("https://nekobot.xyz/api/image")
			.query({ type: "thigh" })
			.end((err, response, body) => {
				let emb = new discord.MessageEmbed()
					.setImage(response.body.message)
					.setColor("#00ff00")
					.setTitle("Бедро здесь")
					.setFooter(
						`©2021 Mangal❗ | Эта команда запрошена ${msg.author.username}#${msg.author.discriminator}`
					);

				msg.channel.send(emb);
			});
	} else {
		msg.channel.send("Это не канал NSFW!");
	}
};

module.exports.help = {
	name: "thigh",
	description: "Эта команда используется для создания изображения бедра.",
	usage: "thigh",
	accessableby: "NSFW/Member",
	aliases: [],
};
