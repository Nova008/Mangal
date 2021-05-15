const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
	let notice3 = new Discord.MessageEmbed()
		.setDescription(
			`💔 **Пожалуйста, введите текст, по которому вы хотите передумать!**`
		)
		.setColor("RED");
	let mindtxt = args.slice(0).join(" ");
	if (!mindtxt)
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 10000 }));

	let image = await canvacord.Canvas.changemymind(mindtxt);

	let triggered = new Discord.MessageAttachment(image, "changemymind.png");

	message.channel.send(triggered);
};

module.exports.help = {
	name: "cmd",
	description: "Измени мой разум, пожалуйста.",
	usage: "changemymind <текст>(optional)",
	accessableby: "Member",
	aliases: [],
};
