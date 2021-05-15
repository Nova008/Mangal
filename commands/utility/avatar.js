const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
	let avatar = message.mentions.users.size
		? message.mentions.users
				.first()
				.avatarURL({ format: "png", dynamic: true, size: 2048 })
		: message.author.avatarURL({ format: "png", dynamic: true, size: 2048 });
	if (message.mentions.users.size > 0) {
		const embed = new Discord.MessageEmbed()
			.setColor(0xffff00)
			.setTitle(`Аватар для ${message.mentions.users.first().username}:`)
			.setImage(`${avatar}`);

		message.channel.send({ embed });
	} else {
		const embed = new Discord.MessageEmbed()
			.setColor(0xffff00)
			.setTitle(`Аватар для ${message.author.username}:`)
			.setImage(`${avatar + "?size=2048"}`);

		message.channel.send({ embed });
	}
};

module.exports.help = {
	name: "avatar",
	description: "Эта команда используется для отображения аватара вашего / другого участника.",
	usage: "avatar <упомянуть>(optional)",
	accessableby: "Member",
	aliases: [],
};
