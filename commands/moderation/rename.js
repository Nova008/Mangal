const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

exports.run = (client, message, args) => {
	const newname = args.slice(1).join(" ");
	let user;
	const mention = message.mentions.users.first();
	if (!mention) {
		user = message.guilds.members.get(args[0]);
		if (!user) {
			return message
				.reply(
					"Вы должны отметить кого-то или дать мне действительный идентификатор пользователя, чтобы я мог его переименовать."
				)
				.catch(console.error);
		}
	} else {
		user = message.guild.member(mention);
	}

	try {
		user.setNickname(newname);
	} catch (e) {
		const embed = new Discord.MessageEmbed().setDescription(
			"💔 **Не удалось установить ник пользователя!**"
		);
		message.channel.send(embed3);
	}
	const embed = new Discord.MessageEmbed().setDescription(
		"💔 **Псевдоним установлен!**"
	);
	message.channel.send(embed);
};

module.exports.help = {
	name: "rename",
	description: "Эта команда используется для переименования чьего-либо имени.",
	usage: "rename <упоминает> <ник>",
	accessableby: "Manage Nicknames",
	aliases: [],
};
