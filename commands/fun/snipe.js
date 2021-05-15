const Discord = require("discord.js");

module.exports.run = (client, message, args) => {
	const msg = client.snipes.get(message.channel.id);
	if (!msg)
		return message.channel.send(
			"В этом канале нет удаленных сообщений!"
		);
	const embed = new Discord.MessageEmbed()
		.setAuthor(msg.author)
		.setDescription(msg.content);
	if (msg.image) embed.setImage(msg.image);

	message.channel.send(embed);
};

module.exports.help = {
	name: "snipe",
	description:
		"Эта команда используется для удаления последнего сообщения, удаленного участниками.",
	usage: "snipe",
	accessableby: "Member",
	aliases: [],
};
