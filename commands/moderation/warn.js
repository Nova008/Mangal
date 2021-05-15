const Discord = require("discord.js");
const fs = require("fs");
const ms = require("ms");

module.exports.run = async (client, message, args) => {
	let reason = args.slice(1).join(" ");
	const user = message.mentions.users.first();
	const warns = JSON.parse(
		fs.readFileSync("./temp-datastore/warnings.json", "utf8")
	);

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
	if (
		!message.guild
			.member(client.user)
			.hasPermission(["MANAGE_ROLES", "KICK_MEMBERS", "BAN_MEMBERS"])
	) {
		return message.channel
			.send(notice3)
			.then(m => m.delete({ timeout: 15000 }));
	}
	if (!message.member.hasPermission("KICK_MEMBERS")) {
		return message.channel
			.send(notice1)
			.then(m => m.delete({ timeout: 15000 }));
	}
	if (message.mentions.users.size < 1) {
		return message
			.reply("Вы должны упомянуть кого-нибудь, чтобы предупредить их.")
			.catch(console.error);
	}
	const notice2 = new Discord.MessageEmbed()
		.setDescription("💔 **Ты не можешь себя предупредить**")
		.setColor("RED");
	if (message.mentions.users.first().id === message.author.id) {
		return message.channel
			.send(notice2)
			.then(m => m.delete({ timeout: 15000 }));
	}
	// if (!logchannel) return message.channel.send('Я не могу найти канал журналов');

	if (reason.length < 1) reason = "Причина не указана.";

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
	const botRolePossition = message.guild.member(client.user).roles.highest
		.position;
	const rolePosition = message.guild.member(user).roles.highest.position;
	const userRolePossition = message.member.roles.highest.position;
	if (userRolePossition <= rolePosition) return message.channel.send(dsfdsfsdf);
	if (botRolePossition <= rolePosition)
		return message.channel.send(sdfsdfsdfsd);

	if (!warns[`${user.id}, ${message.guild.id}`]) {
		warns[`${user.id}, ${message.guild.id}`] = {
			warns: 0,
		};
	}

	warns[`${user.id}, ${message.guild.id}`].warns++;

	fs.writeFile("./temp-datastore/warnings.json", JSON.stringify(warns), err => {
		if (err) throw err;
	});

	const embed = new Discord.MessageEmbed()
		.setColor(0xffff00)
		.setTimestamp()
		.addField("Действие:", "Предупреждение")
		.addField("Пользователь:", `${user.username}#${user.discriminator}`)
		.addField(
			"Предупрежден:",
			`${message.author.username}#${message.author.discriminator}`
		)
		.addField(
			"Количество предупреждений:",
			warns[`${user.id}, ${message.guild.id}`].warns
		)
		.addField("Причина", reason);

	const test1 = new Discord.MessageEmbed()
		.setDescription(
			`🖤 **Приглушенный <@${user.id}> На 1 час** | **Достигнуто два предупреждения**`
		)
		.setColor("GREEN");
	const bsuembed = new Discord.MessageEmbed()
		.setDescription(
			`🖤 **Предупрежден ${user.username}#${user.discriminator}** | **${reason}**`
		)
		.setColor("GREEN");
	message.delete();
	message.channel.send(bsuembed);
	if (user.bot) return;
	message.mentions.users
		.first()
		.send(`Вас предупредили на сервере **${message.guild.name}**, **${reason}**`)
		.catch(e => {
			if (e) return;
		});

	const test2 = new Discord.MessageEmbed()
		.setDescription(
			`🖤 **Выгнал ${user.username}#${user.discriminator}** | **Достигнуты 3 предуреждения**`
		)
		.setColor("GREEN");
	const test3 = new Discord.MessageEmbed()
		.setDescription(
			`🖤 **Забанел ${user.username}#${user.discriminator}** | **Достигнуто 5 предупреждений**`
		)
		.setColor("GREEN");

	if (warns[`${user.id}, ${message.guild.id}`].warns == 2) {
		const muteRole = client.guilds.cache
			.get(message.guild.id)
			.roles.cache.find(val => val.name === "Грешник");

		const mutetime = "60s";
		message.guild.members.cache.get(user.id).addRole(muteRole.id);
		message.channel.send(test1);

		setTimeout(() => {
			message.guild.members.cache.get(user.id).removeRole(muteRole.id);
		}, ms(mutetime));
	}

	if (warns[`${user.id}, ${message.guild.id}`].warns == 3) {
		message.guild.member(user).kick(reason);
		message.channel.send(test2);
	}

	if (warns[`${user.id}, ${message.guild.id}`].warns == 5) {
		message.guild.member(user).ban(reason);
		message.channel.send(test3);
	}
};

module.exports.help = {
	name: "warn",
	description:
		"Предупредить кого-то, кого вы ненавидите/нарушаете правила, 2 предупреждают об отключении звука, 3 предупреждают о кике, 5 предупреждают о бане.",
	usage: "warn <упомянуть> <применить>",
	accessableby: "Member",
	aliases: [],
};
