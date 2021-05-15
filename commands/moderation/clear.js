const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, message, args) => {
	let embed6 = new Discord.MessageEmbed()
		.setDescription(
			`💔 ${message.author.username}, Отсутствует разрешение`
		)
		.setColor("RED");
	if (!message.member.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send(embed6).then(m => m.delete({ timeout: 5000 }));
	if (!args[0])
		return message.channel
			.send(`💔 Применение: **\`?clear <1 - 100>\`**`)
			.then(m => m.delete({ timeout: 7000 }));

	let embed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTitle("Очистить действие")
		.addField("Пользователь", `<@${message.author.id}> `)
		.addField("Очищено", `**${args[0]}**`)
		.addField("Канал", `${message.channel} | **${message.channel.name}**`);

	let kntlembed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setDescription(`Очищено **${args[0]}** Сообщений!`);

	try {
		message.channel.bulkDelete(args[0]).then(() => {
			message.channel.send(kntlembed).then(m => m.delete({ timeout: 4000 }));
		});
	} catch (e) {
		let embedssss = new Discord.MessageEmbed()
			.setTitle(`**Очистка сообщений от Mangal❗**`)
			.setDescription(
				`
            **Error:**
						\`\`\`${e}\`\`\``
			)
			.setColor("#ff0000");

		return message.channel
			.send(embedssss)
			.then(m => m.delete({ timeout: 7000 }));
	}
};

module.exports.help = {
	name: "clear",
	description: "Очистить сообщение с суммой",
	usage: "clear <количество>(1-99)",
	accessableby: "Manage Message",
	aliases: [],
};
