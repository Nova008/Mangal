const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	let avatar = message.attachments.array()[0].url;
	if (!avatar) return message.channel.send("Отсутствует изображение");
	let rainbow = new Discord.MessageAttachment(avatar, "image.png");
	return message.channel.send(rainbow);
};

module.exports.help = {
	name: "send-image",
	description: "Эта команда используется для повторной отправки изображений.",
	usage: "send-image <вложения>",
	accessableby: "Member",
	aliases: [],
};
