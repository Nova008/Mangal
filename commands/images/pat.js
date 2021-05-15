const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	// eslint-disable-line no-unused-vars
	try {
		let member = message.mentions.members.first();

		require("request")(
			{ url: "https://nekos.life/api/pat", json: true },
			(req, res, json) => {
				if (member) {
					let embed = new Discord.MessageEmbed()
						.setTitle(message.author.username + " гладили " + member.user.username)
						.setColor("#363942")
						.setDescription(
							message.author.username + " погладил " + member.user.username + "!"
						)
						.setImage(json.url);

					message.channel.send(embed);
				} else message.reply("Вы должны упомянуть пользователя, чтобы погладить!");
			}
		);
	} catch (err) {
		message.channel.send("Это была ошибка!\n" + err).catch();
	}
};

module.exports.help = {
	name: "pat",
	description: "Эта команда используется для генерации поцелуя.",
	usage: "pat <упомянуть>",
	accessableby: "Members",
	aliases: [],
};
