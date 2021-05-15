const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
	let xhxdsa = message.mentions.channels.first();

	if (xhxdsa) {
		let nsfwV = xhxdsa.nsfw ? "Да" : "Нет";
		let parentV = xhxdsa.parent ? xhxdsa.parent : "Нет родительской категории";
		let topicV = xhxdsa.topic
			? xhxdsa.topic
			: "На этом канале нет темы.";
		let embed = new Discord.MessageEmbed()
			.setTitle("Канал: " + xhxdsa.name)
			.setDescription("Тема: " + topicV)
			.addField("NSFW?", nsfwV, true)
			.addField("Категория: ", parentV, true)
			.addField("Должность: ", xhxdsa.position, true)
			.setColor("GREEN");

		return message.channel.send(embed);
	} else {
		let nsfwV = message.channel.nsfw ? "Да" : "Нет";
		let parentV = message.channel.parent
			? message.channel.parent
			: "Нет родительской категории";
		let topicV = message.channel.topic
			? message.channel.topic
			: "На этом канале нет темы.";
		let embed = new Discord.MessageEmbed()
			.setTitle("Канал: " + message.channel.name)
			.setDescription("Тема: " + topicV)
			.addField("NSFW?", nsfwV, true)
			.addField("Категория: ", parentV, true)
			.addField("Должность: ", message.channel.position, true)
			.setColor("GREEN");

		return message.channel.send(embed);
	}
};

module.exports.help = {
	name: "channel",
	description: "Проверка статуса канала.",
	usage: "channel <канал-упомянуть>(optional)",
	accessableby: "Member",
	aliases: [],
};
