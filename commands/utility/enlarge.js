const Discord = require("discord.js");
const { parse } = require("twemoji-parser");

module.exports.run = async (client, message, args) => {
	const emoji = args[0];
	if (!emoji) return message.channel.send("Смайликов нет!");

	let custom = Discord.Util.parseEmoji(emoji);
	const embed = new Discord.MessageEmbed()
		.setTitle(`Увеличенная версия ${emoji}`)
		.setColor("#FFFF00");

	if (custom.id) {
		embed.setImage(
			`https://cdn.discordapp.com/emojis/${custom.id}.${
				custom.animated ? "gif" : "png"
			}`
		);
		return message.channel.send(embed);
	} else {
		let parsed = parse(emoji, { assetType: "png" });
		if (!parsed[0]) return message.channel.send("Недействительный смайлик!");

		embed.setImage(parsed[0].url);
		return message.channel.send(embed);
	}
};

module.exports.help = {
	name: "enlarge",
	description: "Эта команда используется для увеличения некоторых смайлов отовсюду.",
	usage: "enlarge <смайлики>",
	accessableby: "Memeber",
	aliases: [],
};
