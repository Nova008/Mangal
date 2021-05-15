const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let shoutinfo = args.slice(1).join(" ");
	let shouttitle = args[0];

	const noPerms = new Discord.MessageEmbed()
		.setDescription(
			`💔 ${message.author.username}, Отсутствует разрешение!`
		)
		.setColor(0xff0000);

	const noPerms123 = new Discord.MessageEmbed()
		.setDescription(
			`💔 ${message.author.username}, Отсутствует информация или заголовок!`
		)
		.setColor(0xff0000);

	if (!message.member.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send(noPerms).then(msg => msg.delete(5000));

	if (!shoutinfo) {
		message.delete();
		return message.channel.send(noPerms123);
	}

	if (!shouttitle) {
		message.delete();
		return message.channel.send(noPerms123);
	}

	const embed1 = new Discord.MessageEmbed()
		.setTitle(`${shouttitle}`)
		.setDescription(`${shoutinfo}`)
		.setColor("GREEN");

	message.delete();
	message.channel.send(embed1);
};

module.exports.help = {
	name: "embed",
	description: "Эта команда используется для встраивания материала в Discord",
	usage: "embed <заглавие> <описание>",
	accessableby: "Member",
	aliases: [],
};
