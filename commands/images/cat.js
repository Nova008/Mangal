const request = require("request");
const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	request("http://edgecats.net/random", function (error, response, body) {
		if (!error && response.statusCode == 200) {
			let emb = new Discord.MessageEmbed()
				.setImage(body)
				.setColor("#00ff00")
				.setTitle("Ваша случайная кошка здесь")
				.setFooter(
					`©2021 Mangal⚙ | Эта команда запрошена ${message.author.username}#${message.author.discriminator}`
				);

			message.channel.send(emb);
		}
	});
};

module.exports.help = {
	name: "cat",
	description: "Эта команда используется для случайного размещения изображений кошек.",
	usage: "cat",
	accessableby: "Members",
	aliases: [],
};
