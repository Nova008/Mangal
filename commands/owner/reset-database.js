const Discord = require("discord.js");
const settings = require("../../settings.json");

exports.run = async (client, message, args) => {
	if (message.author.id != process.env.OWNERID)
		return message.channel.send("Только мой разработчик может использовать эту команду ...");
	message.channel.send(
		":warning: При сбросе базы данных все настраиваемые префиксы и информация будут удалены! Тип `confirm` подтвердить! Или отменяется через `20` секунд."
	);
	await message.channel
		.awaitMessages(
			m => m.author.id === message.author.id && m.content === "confirm",
			{
				max: 1,
				time: 20000,
				errors: ["time"],
			}
		)
		.then(collected => {
			client.guilds.cache.forEach(guild => {
				client.settings.delete(guild.id);
				client.settings.ensure(guild.id, settings);
				console.log(`Reset ${guild.name}`);
			});
		})
		.catch(collected => {
			return message.channel.send(":x: | Время вышло! Сбросить базу данных не удалось!");
		});
};

module.exports.help = {
	name: "reset-data",
	description: "Эта команда используется для сброса данных.",
	usage: "reset-data",
	accessableby: "Bot Owners/Database Manager",
	aliases: [],
};
