const Discord = require("discord.js");
const fs = require("fs");
const fetch = require("node-fetch");
const config = require("../../config.json");

module.exports.run = async (client, message) => {
	var milliseconds = parseInt((client.uptime % 1000) / 100),
		seconds = parseInt((client.uptime / 1000) % 60),
		minutes = parseInt((client.uptime / (1000 * 60)) % 60),
		hours = parseInt((client.uptime / (1000 * 60 * 60)) % 24);
	var days = parseInt((client.uptime / (1000 * 60 * 60 * 24)) % 60);
	days = days < 10 ? "0" + days : days;
	hours = hours < 10 ? "0" + hours : hours;
	minutes = minutes < 10 ? "0" + minutes : minutes;
	seconds = seconds < 10 ? "0" + seconds : seconds;
	// var totcmds = files.length;

	fetch(
		`https://api.hetrixtools.com/v1/f10ac71364c8b1aa149b4079fe8eafc9/uptime/report/483cfd9cb2dd306bf8c00917da1df827/`
	)
		.then(response => response.json())
		.then(data => {
			let numberas = data.Uptime_Stats.Total.Uptime.toLocaleString();

			const embed = new Discord.MessageEmbed()
				.setColor(0x7289da)
				.setTimestamp()
				// .addField("Префикс", '.', true)
				// .addField("Всего команд", `${totcmds} commands`, true)
				.addField("Всего серверов", `${client.guilds.cache.size}`, true)
				.addField("Процент времени безотказной работы", `${numberas}%`)
				.addField("Пинг", Math.round(client.ws.ping) + "ms", true)
				.addField(
					"Время безотказной работы",
					days +
						"d " +
						hours +
						"h " +
						minutes +
						"m " +
						seconds +
						"." +
						milliseconds +
						"s",
					true
				)
				.setFooter(
					"©2021 Mangal❗",
					"https://cdn.discordapp.com/attachments/768139328882606080/833760221322936320/c41c4d255f9c87957376e7f62e7a6698.webp"
				);
			return message.channel.send({ embed });
		});
};
module.exports.help = {
	name: "stats",
	description: "Эта команда используется для мониторинга статистики бота.",
	usage: "stats",
	accessableby: "Member",
	aliases: [],
};
