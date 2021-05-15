const Discord = require("discord.js");
const fs = require("fs");
const config = require("../../config.json");

module.exports.run = async (client, msg, args) => {
	const notice3 = new Discord.MessageEmbed()
		.setDescription(
			"💔 **У меня нет разрешения банить людей!**"
		)
		.setColor("RED");
	if (!msg.guild.member(client.user).hasPermission("BAN_MEMBERS")) {
		return msg.channel.send(notice3).then(msg => msg.delete({ timeout: 5000 }));
	}

	const banTaged = msg.mentions.users.first();
	let reason = args.slice(1).join(" ");

	const mmqembed = new Discord.MessageEmbed()
		.setDescription(
			`💔 ${msg.author.username}, Отсутствует разрешение`
		)
		.setColor("#FFFF00");
	if (!msg.member.hasPermission("BAN_MEMBERS")) {
		return msg.channel
			.send(mmqembed)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	const kntlembed = new Discord.MessageEmbed()
		.setTitle("Команда: ban")
		.setDescription(
			"Неправильное использование!。\n\n**Функция:** Забанить участника\n**Применение:** ban [Пользователь] [Причина]\n**Пример:** .ban @Mangal#6666 Pidor"
		)
		.setColor("RED");
	if (!banTaged) {
		msg.delete();
		return msg.channel
			.send(kntlembed)
			.then(msg => msg.delete({ timeout: 10000 }));
	}
	const notice2 = new Discord.MessageEmbed()
		.setDescription("💔 **Вы не можете забанить себя!**")
		.setColor("RED");
	if (msg.mentions.users.first().id === msg.author.id) {
		return msg.channel
			.send(notice2)
			.then(msg => msg.delete({ timeout: 10000 }));
	}
	const dsfdsfsdf = new Discord.MessageEmbed()
		.setDescription(
			"💔  Доступ запрещен, **у этого участника есть роли выше или равные вам!**"
		)
		.setColor("RED");
	const sdfsdfsdfsd = new Discord.MessageEmbed()
		.setDescription(
			"💔  Доступ запрещен, **у этого участника есть роли выше или равные мне!**"
		)
		.setColor("RED");
	const botRolePossition = msg.guild.member(client.user).roles.highest.position;
	const rolePosition = msg.guild.member(banTaged).roles.highest.position;
	const userRolePossition = msg.member.roles.highest.position;
	if (userRolePossition <= rolePosition) return msg.channel.send(dsfdsfsdf);
	if (botRolePossition <= rolePosition) return msg.channel.send(sdfsdfsdfsd);

	const sdfdfsdfsdfdfs = new Discord.MessageEmbed()
		.setDescription(
			"💔 **Произошла ошибка с заблокированным участником!**"
		)
		.setColor("RED");

	if (reason.length < 1) reason = "Причина не указана.";

	if (!msg.guild.member(banTaged).bannable) {
		return msg.channel.send(sdfdfsdfsdfdfs);
	}

	const banEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setAuthor("Запрет действий")
		.addField("Цель", `<@${banTaged.id}>`)
		.addField("Пользователь", `**<@${msg.author.id}>**`)
		.addField("Причина", `\`\`\`${reason}\`\`\``)
		.setTimestamp()
		.setFooter("• Запретить информацию о пользователе"); //
	const bsuembed = new Discord.MessageEmbed()
		.setDescription(
			`🖤 **Забанен ${banTaged.username}#${banTaged.discriminator}** | **${reason}**`
		)
		.setColor("GREEN");

	msg.delete();
	msg.channel.send(bsuembed);
	msg.guild.members.ban(banTaged.id, { reason });

	banTaged.send(
		`Вас забанили на **${msg.guild.name}**, Причина : **${reason}**`
	);
};

module.exports.help = {
	name: "ban",
	description: "Эта команда используется для блокировки участников, которые вам не нравятся.",
	usage: "ban <упомянуть> <причина>(optional)",
	accessableby: "Ban Members",
	aliases: [],
};
