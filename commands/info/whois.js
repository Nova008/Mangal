const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (bot, message, args) => {
	let trufal = {
		true: "Робот",
		false: "Человек",
	};

	let status = {
		online: "<:online:734741273214320652> В сети",
		idle: "<:idle:734741276779479121> Праздный",
		dnd: "<:dnd:734741275139375104> Просьба не беспокоить",
		invisible: "<:invisible:734741275294826606> Не в сети",
	};

	let user;
	if (message.mentions.users.first()) {
		user = message.mentions.users.first();
	} else {
		user = message.author;
	}
	const member = message.guild.member(user);
	const roles = member.roles.cache.map(r => `${r}`).join(", ");
	let serveddrembed = new Discord.MessageEmbed()
		.setDescription("<a:loading:806686528549814344> Получение времени работы ...")
		.setColor("RED");

	message.channel.send(serveddrembed).then(async message => {
		const embed = new Discord.MessageEmbed()
			.setColor("RANDOM")
			.setAuthor(`${user.tag} Info`, message.author.displayAvatarURL)
			.setDescription(
				`**• Имя: **${user.tag}\n**• ID: **${user.id}\n**• Тип аккаунта: **${
					trufal[user.bot]
				}\n**• Статус: **${user.presence.status.toUpperCase()}\n**• Игра: **${
					user.presence.game
						? user.presence.game.name
						: "Я не вижу, чтобы он играл во что-нибудь!"
				}\n**• Создано на: ** ${moment(user.joinedAt).format(
					"DD-MM-YYYY"
				)}\n**• Присоединился к: **${moment(user.createdAt).format(
					"DD-MM-YYYY"
				)}\n**• Аватар**: [Кликните сюда](${user.avatarURL()})\n**• Роли: **${roles}`
			)

			.setThumbnail(`${user.avatarURL()}`)
			.setTimestamp();

		await message.edit(embed);
	});
};

module.exports.help = {
	name: "whois",
	description: "Проверить, кто он / она",
	usage: "whois <упомянуть или оставить пустым>",
	accessableby: "Members",
	aliases: [],
};
