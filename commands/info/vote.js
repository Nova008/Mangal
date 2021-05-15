const Discord = require("discord.js");

module.exports.run = async (bot, msg, args) => {
	msg.delete();
	msg.channel.send(
		"Пожалуйста, голосуйте здесь каждые 12 часов > https://bots.server-discord.com/771057389730005053"
	);
};

module.exports.help = {
	name: "vote",
	description:
		"Проголосуйте за нас https://bots.server-discord.com/771057389730005053/голосование каждые 12 часов",
	usage: "vote",
	accessableby: "Everyone",
	aliases: [],
};
