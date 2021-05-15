const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args, tools) => {
	if (message.channel.nsfw == false)
		return message.channel.send("Это не канал NSFW");
	const { body } = await superagent.get(
		"https://nekos.life/api/v2/img/wallpaper"
	);

	const embed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setTitle("Обои здесь")
		.setImage(body.url);
	message.channel.send({ embed });
};

module.exports.help = {
	name: "wallpaper",
	description: "Генерация обоев NSFW случайным образом",
	usage: "d!wallpaper",
	accessableby: "NSFW/Member",
	aliases: [],
};
