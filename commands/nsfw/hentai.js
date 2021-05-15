const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
	if (message.channel.nsfw === true) {
		const { body } = await superagent.get(
			"https://nekos.life/api/v2/img/hentai"
		);

		const embed = new Discord.MessageEmbed()
			.setColor("#ff9900")
			.setTitle(`Вот твое хентайское изображение`)
			.setImage(body.url)
			.setFooter(`© 2021 Mangal⚙`);
		message.channel.send({ embed });
	} else {
		message.channel.send("Это не канал NSFW!");
	}
};

module.exports.help = {
	name: "hentai",
	description:
		"Эта команда используется для вызова API изображений NSFW для их отправки, но необходим канал NSFW.",
	usage: "hentai",
	accessablechannel: "NSFW Channel",
	accessableby: "NSFW/Member",
	aliases: [],
};
