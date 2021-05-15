const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
	if (!message.mentions.users.first())
		return message.reply("Вы должны упомянуть кого-то, чтобы пощекотать его!");
	if (message.mentions.users.first().id === "766434423628496917")
		return message.reply("Его нельзя пощекотать. Он взорвется при ударе пидорас!");
	if (message.mentions.users.first().id == client.user.id)
		return message.channel.send("Бллллллллллллллл, нахуяяяяяяяяяяяя!!!!!!");
	const { body } = await superagent.get("https://nekos.life/api/v2/img/tickle");

	const embed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setTitle(
			`${message.mentions.users.first().username}, тебя пощекотал ${
				message.author.username
			}`
		)
		.setImage(body.url)
		.setFooter(`©2021 Mangal⚙`);
	message.channel.send({ embed });
};

module.exports.help = {
	name: "tickle",
	description: "Эта команда используется для создания изображения щекотки.",
	usage: "tickle <упомянуть>",
	accessableby: "Member",
	aliases: [],
};
