const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, message, args) => {
	let embed6 = new Discord.MessageEmbed()
		.setDescription(
			`💔 ${message.author.username}, Отсутствует разрешение`
		)
		.setColor("RED");
	let notice3 = new Discord.MessageEmbed()
		.setDescription(
			`💔 **У меня нет разрешения включать людей!**`
		)
		.setColor("RED");
	if (!message.member.hasPermission("MANAGE_MESSAGES"))
		return message.channel.send(embed6).then(m => m.delete({ timeout: 5000 }));
	if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES"))
		return message.channel.send(notice3).then(m => m.delete({ timeout: 5000 }));
	let notice2 = new Discord.MessageEmbed()
		.setDescription(
			`💔 **Вы не можете сделать это за себя!**`
		)
		.setColor("RED");
	if (message.mentions.users.first().id === message.author.id)
		return message.channel.send(notice2);
	let embed7 = new Discord.MessageEmbed()
		.setTitle("Неправельно!")
		.setDescription("Правильный пример: unmute @Mangal")
		.setColor("RED");
	let member = message.mentions.users.first();
	if (!member) {
		message.delete();
		return message.channel.send(embed7).then(m => m.delete({ timeout: 5000 }));
	}
	let embed8 = new Discord.MessageEmbed()
		.setDescription(`:x: **<@${member.id}>**未被靜音`)
		.setColor("RED");
	let muterole = client.guilds.cache
		.get(message.guild.id)
		.roles.cache.find(val => val.name === "Грешник");
	let embed = new Discord.MessageEmbed()
		.setColor("GREEN")
		.setTitle(`Действие Анмута`)
		.addField(`Пользователь`, `<@${member.id}>`)
		.addField(`Исполнитель`, `**$<@${message.author.id}>**`)
		.setTimestamp()
		.setFooter(`• Включение звука для информации о пользователе`);
	let embed5 = new Discord.MessageEmbed()
		.setDescription(`💔 Размючен <@${member.id}>`)
		.setColor("RED");

	message.delete();

	await message.guild.member(member).roles.remove(muterole.id);
	message.channel.send(embed5);
};

module.exports.help = {
	name: "unmute",
	description: "Эта команда используется для включения звука кого-то",
	usage: "unmute <упомянуть>",
	accessableby: "Manage Roles",
	aliases: [],
};
