const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	let inline = true;

	let role = args.join(` `);
	if (!role) return message.reply("Уточняйте роль!");
	let gRole = message.guild.roles.cache.get(role);
	if (!gRole) return message.reply("Не удалось найти эту роль.");

	const status = {
		false: "Нет",
		true: "Да",
	};

	let roleemebed = new Discord.MessageEmbed()
		.setColor("#00ff00")
		.addField("ID", gRole.id, inline)
		.addField("Имя", gRole.name, inline)
		.addField("Упомянания", `<@&${gRole.id}>`, inline)
		.addField("Hex", gRole.hexColor, inline)
		.addField("Члены", gRole.members.size, inline)
		.addField("Должность", gRole.position, inline)
		.addField("Поднял", status[gRole.hoist], inline)
		.addField("Заслуживающий упоминания", status[gRole.mentionable], inline)
		.addField("Удалось", status[gRole.managed], inline);

	message.channel.send(roleemebed);
};

module.exports.help = {
	name: "roleinfo",
	description: "Эта команда используется информацым о роли.",
	usage: "roleinfo <роль-ID>",
	accessableby: "Member",
	aliases: [],
};
