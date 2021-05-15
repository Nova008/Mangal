const Discord = require("discord.js");

exports.run = (client, message, args) => {
	const notice3 = new Discord.MessageEmbed()
		.setDescription(
			"💔 **Не удалось установить медленный режим на этом канале, проверьте свой номер медленного режима!**"
		)
		.setColor("RED");
	const notice1 = new Discord.MessageEmbed()
		.setDescription(
			"💔 **Не удалось установить медленный режим на этом канале, введите действительный номер!**"
		)
		.setColor("RED");
	const noticwsse1 = new Discord.MessageEmbed()
		.setDescription(
			"💔 **Не удалось установить медленный режим на этом канале, вы можете ввести только 0 - 21600 секунд!**"
		)
		.setColor("RED");
	const notice22 = new Discord.MessageEmbed()
		.setDescription(
			"💔 **У меня нет разрешения на переключение медленного режима канала!**"
		)
		.setColor("RED");
	if (!message.guild.member(client.user).hasPermission("MANAGE_CHANNELS")) {
		return message.channel
			.send(notice3)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	const duration = parseInt(args[0]);
	const mmsssqembed = new Discord.MessageEmbed()
		.setDescription(
			`💔 ${message.author.username}, Отсутствует разрешение`
		)
		.setColor("#FFFF00");
	if (!message.member.hasPermission("MANAGE_CHANNELS")) {
		return message.channel
			.send(mmsssqembed)
			.then(msg => msg.delete({ timeout: 5000 }));
	}
	if (isNaN(duration)) {
		return message.channel.send(notice1);
	}
	if (duration < 0 || duration > 21601) {
		return message.channel.send(noticwsse1);
	}
	message.channel.setRateLimitPerUser(duration).catch(() => {
		message.channel.send(notice3);
	});
	const bsuembed = new Discord.MessageEmbed()
		.setDescription(
			`💔 Установите медленный режим канала на **${duration}s** `
		)
		.setColor("GREEN");

	message.channel.send(bsuembed);
};

module.exports.help = {
	name: "slowmode",
	description:
		"Эта команда используется для изменения медленного режима, поскольку страница настроек не может.",
	usage: "slowmode <1-21600>",
	accessableby: "Manage Channels",
	aliases: [],
};
