const Discord = require("discord.js");
const ms = require("ms");
const fs = require("fs");
const config = require("../../config.json");

module.exports.run = async (client, message, args) => {
	const tomute = message.mentions.users.first();
	const notice3 = new Discord.MessageEmbed()
		.setDescription(
			"💔 **У меня нет разрешения отключать/мутить людей!**"
		)
		.setColor("RED");
	if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) {
		return message.channel.send(notice3).then(m => m.delete({ timeout: 5000 }));
	}

	//! tempmute @user 1s/m/h/d
	const embed6 = new Discord.MessageEmbed()
		.setDescription(
			`💔 ${message.author.username}, Отсутствует разрешение`
		)
		.setColor("RED");
	if (!message.member.hasPermission("MANAGE_MESSAGES")) {
		return message.channel.send(embed6).then(m => m.delete({ timeout: 5000 }));
	}
	const embed50 = new Discord.MessageEmbed()
		.setTitle("Комманда: mute")
		.setDescription("Применение: mute @пользователь причина ")
		.setColor(0xff0000)
		.setFooter("Beta Feature");
	if (!tomute) return message.channel.send(embed50);
	const notice2 = new Discord.MessageEmbed()
		.setDescription(
			"💔 **Вы не можете отключить себя!**"
		)
		.setColor("RED");
	if (message.mentions.users.first().id === message.author.id)
		return message.channel.send(notice2);

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
	const sdfsdfsdfsssd = new Discord.MessageEmbed()
		.setDescription(
			"💔 Вы можете отключить этого пользователя только на 14 дней!"
		)
		.setColor("RED");
	const dddfs = new Discord.MessageEmbed()
		.setDescription(
			"💔 Введите период отключения звука!"
		)
		.setColor("RED");
	const botRolePossition = message.guild.member(client.user).roles.highest
		.position;
	const rolePosition = message.guild.member(tomute).roles.highest.position;
	const userRolePossition = message.member.roles.highest.position;
	if (userRolePossition <= rolePosition) return message.channel.send(dsfdsfsdf);
	if (botRolePossition <= rolePosition)
		return message.channel.send(sdfsdfsdfsd);

	let muterole = client.guilds.cache
		.get(message.guild.id)
		.roles.cache.find(val => val.name === "Muted");
	if (!muterole) {
		try {
			muterole = await message.guild.createRole({
				name: "Muted",
				color: "#000000",
				permissions: [],
			});
			message.guild.channels.forEach(async (channel, id) => {
				await channel.overwritePermissions(muterole, {
					SEND_MESSAGES: false,
					ADD_REACTIONS: false,
				});
			});
		} catch (e) {
			console.log(e.stack);
		}
	}

	// end of create role
	const mutetime = args[1];
	if (!mutetime) return message.channel.send(embed50);
	if (isNaN(ms(mutetime))) return message.channel.send(sdfsdfsdfsssd);
	if (ms(mutetime) > 1209600000) return message.channel.send(dddfs);
	let reason = args.slice(2).join(" ");
	if (reason.length < 1) reason = "Причина не указана.";

	const logs = message.guild.channels.cache.find(
		x => (x.name = config.logsChannel)
	);

	const embed = new Discord.MessageEmbed()
		.setTitle("Отключение звука")
		.setColor("RED")
		.addField("Цель", `<@${tomute.id}>`)
		.addField("Пользователь", `<@${message.author.id}>`)
		.addField("TempMute Длина", `${ms(ms(mutetime))}`)
		.addField("Причина", `\`\`\`${reason}\`\`\``)
		.setTimestamp()
		.setFooter("• Отключить информацию о пользователе");

	const embed10 = new Discord.MessageEmbed()
		.setDescription(
			`💔 **Приглушенный ${tomute.username}#${
				tomute.discriminator
			} for ${ms(ms(mutetime))}** | **${reason}**`
		)
		.setColor("GREEN");

	await message.guild.member(tomute).roles.add(muterole);
	message.delete();
	message.channel.send(embed10);
	tomute.send(
		`Вас отключили на **${ms(ms(mutetime))}** в **${
			message.guild.name
		}**, Причина : **${reason}**`
	);

	setTimeout(() => {
		message.guild.member(tomute).roles.remove(muterole.id);
	}, ms(mutetime));
};

module.exports.help = {
	name: "mute1",
	description: "Эта команда используется для отключения звука некоторых людей, которые действительно раздражают.",
	usage: "mute <упомянуть> <продолжительность> <причина>",
	accessableby: "Manage Roles",
	aliases: [],
};
