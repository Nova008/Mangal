const Discord = module.require("discord.js");
const ms = require("ms");

module.exports.run = async (bot, message, args) => {
	let Timer = args[0];
	if (isNaN(Timer))
		return message.reply("хех, время написания текста да? Как насчет **нет**?");
	if (ms(Timer) > 2147483647)
		return message.reply(
			"Ты тупица, как ты думаешь, что я справлюсь с таким большим номером!"
		);
	if (ms(Timer) < 1) return message.reply("Какой в ​​этом смысл?");

	if (!args[0]) {
		return message.channel.send(
			":x: " + '| Пожалуйста, введите период времени, а затем "`сек` или же `мин` или же `часы`"'
		);
	}

	if (args[0] <= 0) {
		return message.channel.send(
			":x: " + '| Пожалуйста, введите период времени, а затем "`сек` или же `мин` или же `часы`"'
		);
	}

	message.channel.send(
		"💔 " +
			"| Таймер запущен на: " +
			`${ms(ms(Timer), { long: true })}`
	);

	setTimeout(function () {
		message.channel.send(
			message.author.toString() +
				` Таймер Прозвонил!, это длилось: ${ms(ms(Timer), { long: true })}`
		);
	}, ms(Timer));
};

module.exports.help = {
	name: "timer",
	description: "Эта команда используется для измерения времени.",
	usage: "timer <продолжительность в мс>",
	accessableby: "Member",
	aliases: [],
};
