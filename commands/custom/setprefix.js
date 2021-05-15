const Discord = require("discord.js");
const fs = require("fs");
const settings = require("../../settings.json");

module.exports.run = async (client, message, args) => {
	if (!message.member.hasPermission("MANAGE_SERVER"))
		return message.channel.send("Отсутствует разрешение!");

	client.settings.ensure(message.guild.id, settings);

	if (!args[0])
		return message.channel.send("Введите префикс, который вы хотите установить.");

	client.settings.set(message.guild.id, args[0], "prefix");

	// We can confirm everything's done to the client.
	message.channel.send(`Префикс был изменен на: ${args[0]}`);
};

module.exports.help = {
	name: "setprefix",
	description: "Эта команда используется для изменения префикса на сервере.",
	usage: "setprefix <симбол>",
	accessableby: "Manage Server",
	aliases: [],
};
