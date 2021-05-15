const Discord = require("discord.js");
const config = require("../../config.json");

module.exports.run = (client, message, args) => {
	const reason = args.slice(1).join(" ");
	const user = args[0];

	const embed1 = new Discord.MessageEmbed()
		.setTitle("Error")
		.setDescription("**Введенный вами пользователь не забанен!**")
		.setColor("RED");
	const embed2 = new Discord.MessageEmbed()
		.setDescription("вы должны указать `UserID, то есть идентификатор пользователя.")
		.setColor("RED");
	const userID = args[0];
	message.guild.fetchBans().then(bans => {
		if (bans.size == 0) {
			return message.channel
				.send(embed1)
				.then(m => m.delete({ timeout: 15000 }));
		}
		const bUser = bans.find(b => b.user.id == userID);
		if (!bUser) {
			return message.channel
				.send(embed2)
				.then(m => m.delete({ timeout: 15000 }));
		}
		const EMDDD = new Discord.MessageEmbed()
			.setDescription(`💔 **Разбанен** **${args[0]}**`)
			.setColor("#FFFF00");
		message.channel.send(EMDDD);
		message.guild.members.unban(bUser.user);
	});
};

module.exports.help = {
	name: "unban",
	description: "Эта команда используется для разблокировки кого-то.",
	usage: "unban <USER ID>",
	accessableby: "Ban Members",
	aliases: [],
};
