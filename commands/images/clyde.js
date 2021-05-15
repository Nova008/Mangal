const Discord = require("discord.js");
const canvacord = require("canvacord");

module.exports.run = async (client, message, args) => {
	let notice3 = new Discord.MessageEmbed()
		.setDescription(
			`💔 **Пожалуйста, введите текст для Клайда!**`
		)
		.setColor("RED");
	let mindtxt = args.slice(0).join(" ");
	if (!mindtxt)
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 10000 }));

	let image = await canvacord.Canvas.clyde(mindtxt);

	let triggered = new Discord.MessageAttachment(image, "clyde.png");

	message.channel.send(triggered);
};

module.exports.help = {
	name: "clyde",
	description: "Действует как Клайд",
	usage: "clyde <тектс>",
	accessableby: "Member",
	aliases: [],
};
