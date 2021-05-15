const fetch = require("node-fetch");
const Discord = require("discord.js");

module.exports.run = async (client, message, args) => {
	fetch(`http://ip-api.com/json/?fields=countryCode,regionName,timezone`)
		.then(response => response.json())
		.then(data => {
			let serverlocation = data.regionName.toLocaleString();
			let servercountry = data.countryCode.toLocaleString();

			const bbb = new Discord.MessageEmbed().setDescription(
				`:desktop: Расположение сервера: **${servercountry}-${serverlocation}**\n\nЗадержка сообщения: **${
					Date.now() - message.createdTimestamp
				}ms**.\nЗадержка API: **${Math.round(
					client.ws.ping
				)}ms**\n\nПроверить статус бота [здесь](https://discord.gg/f3tq6Ep3Ja)`
			);
			message.channel.send(bbb);
		});
};

module.exports.help = {
	name: "ping",
	description: "Эта команда используется для пинга бота.",
	usage: "ping",
	accessableby: "Members",
	aliases: [],
};
