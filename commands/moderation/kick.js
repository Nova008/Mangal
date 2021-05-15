const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = async (client, msg, args) => {
	const notice3 = new Discord.MessageEmbed()
		.setDescription(
			"💔 **У меня нет разрешения кикать людей!**"
		)
		.setColor("RED");
	if (!msg.guild.member(client.user).hasPermission("KICK_MEMBERS"))
		return msg.channel.send(notice3).then(m => m.delete({ timeout: 5000 }));
	const kickTaged = msg.mentions.users.first();
	let reason = args.slice(1).join(" ");
	const embed6 = new Discord.MessageEmbed()
		.setDescription(
			`💔 ${msg.author.username}, Отсутствует разрешение`
		)
		.setColor("RED");
	if (!msg.member.hasPermission("KICK_MEMBERS"))
		return msg.channel.send(embed6).then(m => m.delete({ timeout: 5000 }));
	const mmqembed = new Discord.MessageEmbed()
		.setTitle("Команда: kick")
		.setDescription("Применение: kick @пользователь причина")
		.setColor("RED");
	if (!kickTaged) {
		msg.delete();
		return msg.channel.send(mmqembed).then(m => m.delete({ timeout: 5000 }));
	}

	const dsfdsfsdf = new Discord.MessageEmbed()
		.setDescription(
			"💔 Доступ запрещен, **у этого участника есть роли выше или равные вам!**"
		)
		.setColor("RED");
	const sdfsdfsdfsd = new Discord.MessageEmbed()
		.setDescription(
			"💔 Доступ запрещен, **у этого участника есть роли выше или равные мне!**"
		)
		.setColor("RED");
	const botRolePossition = msg.guild.member(client.user).roles.highest.position;
	const rolePosition = msg.guild.member(kickTaged).roles.highest.position;
	const userRolePossition = msg.member.roles.highest.position;
	if (userRolePossition <= rolePosition) return msg.channel.send(dsfdsfsdf);
	if (botRolePossition <= rolePosition) return msg.channel.send(sdfsdfsdfsd);

	const notice2 = new Discord.MessageEmbed()
		.setDescription(
			"💔 **Вы не можете кикать себя!**"
		)
		.setColor("RED");
	if (msg.mentions.users.first().id === msg.author.id)
		return msg.channel.send(notice2);

	const sdfdfsdfsdfdfs = new Discord.MessageEmbed()
		.setDescription(
			"💔 **Произошла ошибка с заблокированным участником!**"
		)
		.setColor("RED");

	if (!msg.guild.member(kickTaged).kickable) {
		return msg.channel.send(sdfdfsdfsdfdfs);
	}

	if (reason.length < 1) reason = "Причина не указана.";

	const kickEmbed = new Discord.MessageEmbed()
		.setColor("RED")
		.setTitle("Действия Кика")
		.addField("Цель", `**<@${kickTaged.id}> **`)
		.addField("Пользователь", `<@${msg.author.id}>`)
		.addField("Причина", `\`\`\`${reason}\`\`\``)
		.setTimestamp();

	const suembed = new Discord.MessageEmbed()
		.setDescription(
			`💔 **Выгнал ${kickTaged.username}#${kickTaged.discriminator}** | **${reason}**`
		)
		.setColor("GREEN");
	msg.delete();
	msg.channel.send(suembed);
	msg.guild.member(kickTaged).kick(reason);

	kickTaged.send(`Тебя кикнули на  **${msg.guild.name}**, ${reason}`);
};

module.exports.help = {
	name: "kick",
	description:
		"Эта команда используется для того, чтобы пинать людей, которых вы ненавидите, или нарушая правила вашего сервера.",
	usage: "kick <упомянуть> <причина>",
	accessableby: "Kick Members",
	aliases: [],
};
