const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = (client, message, args) => {
	const notice1 = new Discord.MessageEmbed()
		.setDescription(
			`💔 **${message.author.username}, Отсутствует разрешение**`
		)
		.setColor("RED");
	const notice3 = new Discord.MessageEmbed()
		.setDescription(
			"💔 **У меня нет разрешения предупреждать людей!**"
		)
		.setColor("RED");
	const noticEEEe2 = new Discord.MessageEmbed()
		.setDescription(
			"💔 **Вы должны упомянуть кого-то, чтобы снять его предупреждения**"
		)
		.setColor("RED");
	const noticEEREe2 = new Discord.MessageEmbed()
		.setDescription("💔 **Не удалось найти этого пользователя**")
		.setColor("RED");
	if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) {
		return message.channel
			.send(notice3)
			.then(m => m.delete({ timeout: 15000 }));
	}
	if (!message.member.hasPermission("KICK_MEMBERS")) {
		return message.channel
			.send(notice1)
			.then(m => m.delete({ timeout: 15000 }));
	}

	const warns = JSON.parse(
		fs.readFileSync("./temp-datastore/warnings.json", "utf8")
	);
	const user = message.mentions.users.first();
	if (message.mentions.users.size < 1) return message.channel.send(noticEEEe2);
	if (!user) return message.channel.send(noticEEREe2);
	if (!warns[`${user.id}, ${message.guild.id}`]) {
		warns[`${user.id}, ${message.guild.id}`] = {
			warns: 0,
		};
	}
	let reason = `${
		warns[`${user.id}, ${message.guild.id}`].warns
	} warnings have been cleared for this person`;
	if (warns[`${user.id}, ${message.guild.id}`].warns > 0) {
		warns[`${user.id}, ${message.guild.id}`] = {
			warns: 0,
		};
	} else {
		reason = "У этого пользователя нет предупреждений:wink:";
	}

	fs.writeFile("./temp-datastore/warnings.json", JSON.stringify(warns), err => {
		if (err) throw err;
	});

	const embed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTimestamp()
		.addField("Действие:", "Очистить предупреждения", true)
		.addField("Пользователь:", `${user.username}#${user.discriminator}`, true)
		.addField("Результат:", reason, true);
	message.channel.send({ embed });
};

module.exports.help = {
	name: "clearwarn",
	description: "Очистить предупреждения",
	usage: "clearwarn <упомянуть>",
	accessableby: "Управление ролями",
	aliases: [],
};
