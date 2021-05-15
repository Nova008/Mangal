const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
	const emddd = new Discord.MessageEmbed()
		.setDescription(
			"💔 **Не удалось найти этого пользователя...!**"
		)
		.setColor("RED");

	const warns = JSON.parse(
		fs.readFileSync("./temp-datastore/warnings.json", "utf8")
	);
	const user = message.mentions.users.first();
	if (message.mentions.users.size < 1) {
		return message
			.reply("Вы должны упомянуть кого-то, чтобы проверить его предупреждения.")
			.catch(console.error);
	}
	if (!user) return message.channel.send(emddd);
	if (!warns[`${user.id}, ${message.guild.id}`]) {
		warns[`${user.id}, ${message.guild.id}`] = {
			warns: 0,
		};
	}
	// if (!warns[user.id]) return message.channel.send(emddd)

	const embed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTimestamp()
		.setTitle("💔 Проверить Предупреждение")
		.addField("Участник:", `${user.username}#${user.discriminator}`)
		.addField(
			"Количество предупреждений:",
			warns[`${user.id}, ${message.guild.id}`].warns
		);
	message.channel.send({ embed });
};

module.exports.help = {
	name: "warnings",
	description: "Отметьте людей, которых вы упомянули, у которых есть предупреждения или нет",
	usage: "warnings <упомянуть>",
	accessableby: "Members",
	aliases: [],
};
