const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
	const { body } = await superagent.get("https://nekos.life/api/v2/img/ngif");

	const embed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setTitle(`OwO, вот твой Neko Gif`)
		.setImage(body.url)
		.setFooter(`©2021 Mangal⚙`);
	message.channel.send({ embed });
};

module.exports.help = {
	name: "ngif",
	description: "Эта команда используется для создания Neko Gif.",
	usage: "ngif",
	accessableby: "Members",
	aliases: [],
};
