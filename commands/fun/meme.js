const Discord = require("discord.js");
const request = require("request");

module.exports.run = (client, message, _args) => {
	try {
		//This is a command purely for memes
		request(
			"https://some-random-api.ml/meme",
			function (error, _response, body) {
				if (error)
					return message.channel
						.send("Извините, похоже, при загрузке вашего мема произошла ошибка!")
						.then(() => console.error(error.message));

				const json = JSON.parse(body);
				const { id, image, caption, category } = json;

				const emb = new Discord.MessageEmbed();
				emb.setDescription(`${caption} - ${category} #${id}`);
				emb.setColor("GREEN");
				emb.setImage(image);

				message.channel.send(emb);
			}
		);
	} catch (e) {
		console.error(e.message);
	}
};

module.exports.help = {
	name: "meme",
	description: "Эта команда используется для создания классных мемов.",
	usage: "meme",
	accessableby: "Member",
	aliases: [],
};
