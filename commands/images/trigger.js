const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
	let target = message.mentions.users.first() || message.author;

	let avatar = message.attachments.array()[0];

	if (avatar) {
		if (avatar.url) {
			let image = await canvacord.Canvas.trigger(avatar.url);
			let rainbow = new Discord.MessageAttachment(image, "trigger.png");
			return message.channel.send(rainbow);
		}
	} else {
		let image = await canvacord.Canvas.trigger(
			target.displayAvatarURL({ dynamic: false, format: "png" })
		);
		let rainbow = new Discord.MessageAttachment(image, "trigger.png");
		return message.channel.send(rainbow);
	}
};

module.exports.help = {
	name: "trigger",
	description: "Эта команда используется для генерации триггерного изображения",
	usage: "d!trigger <упомянуть или ответить>",
	accessableby: "Member",
	aliases: [],
};
