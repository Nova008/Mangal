const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	try {
		let member = message.mentions.members.first();
		require("request")(
			{ url: "https://nekos.life/api/kiss", json: true },
			(req, res, json) => {
				if (member) {
					let embed = new Discord.MessageEmbed()
						.setTitle(
							message.author.username + " поцеловал " + member.user.username
						)
						.setColor("#eeeeee")

						.setImage(json.url);

					message.channel.send(embed);
				} else message.reply("Вам нужно упомянуть пользователя, чтобы он поцеловался!");
			}
		);
	} catch (err) {
		message.channel.send("Это была ошибка!\n" + err).catch();
	}
};

module.exports.help = {
	name: "kiss",
	description: "Эта команда используется для поцелуя кого-то, кого вы любите.",
	usage: "kiss <упомянуть>",
	accessableby: "Member",
	aliases: [],
};
