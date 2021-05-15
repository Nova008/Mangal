const Discord = require("discord.js");
module.exports.run = async (client, message, args) => {
	let notice3 = new Discord.MessageEmbed()
		.setDescription(
			`💔 **У меня нет разрешения на создание смайлов!**`
		)
		.setColor("RED");
	if (!message.guild.member(client.user).hasPermission("MANAGE_EMOJIS"))
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 5000 }));
	try {
		let embed6 = new Discord.MessageEmbed()
			.setDescription(
				`💔 ${message.author.username}, Отсутствует разрешение`
			)
			.setColor("RED");
		if (!message.member.hasPermission("MANAGE_EMOJIS"))
			return message.channel.send(embed6).then(msg => msg.delete(5000));
		let emoji = message.attachments.array()[0] || args[0];

		if (emoji) {
			if (emoji.url) {
				if (args[0]) {
					message.guild.emojis
						.create(emoji.url, args[0])
						.then(emoji =>
							message.channel.send("Я создал " + emoji.name + " смайлик!")
						)
						.catch(err =>
							message.reply("Я не смог создать смайлик!\n" + err)
						);
				} else message.reply("Вам нужно ввести название для смайлика!");
			} else {
				if (args[1]) {
					message.guild.emojis
						.create(emoji, args[1])
						.then(emoji =>
							message.channel.send("Я создал " + emoji.name + " смайлик!")
						)
						.catch(err =>
							message.reply("Я не смог создать смайлик!\n" + err)
						);
				} else message.reply("Вам нужно ввести название для смайлика!");
			}
		} else message.reply("Вам нужно дать изображение для смайлика!");
	} catch (err) {
		message.channel.send("Это была ошибка!\n" + err).catch();
	}
};

module.exports.help = {
	name: "createemoji",
	description: "Легко создавайте смайлики с помощью команд",
	usage: "createemoji <имя> <вложения>",
	accessableby: "Manage Emojis",
	aliases: [],
};
