const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
	let target = message.mentions.users.first() || message.author;

	let avatar = message.attachments.array()[0];

	if (avatar) {
		if (avatar.url) {
			let image = await canvacord.Canvas.delete(avatar.url);
			let rainbow = new Discord.MessageAttachment(image, "delete.png");
			return message.channel.send(rainbow);
		}
	} else {
		let image = await canvacord.Canvas.delete(
			target.displayAvatarURL({ dynamic: false, format: "png" })
		);
		let rainbow = new Discord.MessageAttachment(image, "delete.png");
		return message.channel.send(rainbow);
	}
};

module.exports.help = {
	name: "delete",
	description:
		"Эта команда используется для удаления того, кого вы ненавидите, с помощью корзины для мусора Windows.",
	usage: "delete [<упомянуть> или <ответить>]",
	accessableby: "Member",
	aliases: [],
};
