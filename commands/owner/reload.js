const Discord = require("discord.js");
const fs = require("fs");
const config = require("../../config.json");

module.exports.run = async (client, message, args) => {
	if (message.author.id != process.env.OWNERID)
		return message.channel.send("Только мой разработчик может использовать эту команду ...");

	message.channel.send(
		":warning: Когда все команды будут перезагружены, все команды будут преобразованы в последние изменения! Тип `confirm` подтвердить! Или отменяется через `20` секунд."
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
			const folders = fs.readdirSync("./commands/");
			for (const files of folders) {
				const folder = fs
					.readdirSync(`./commands/${files}/`)
					.filter(file => file.endsWith(".js"));
				for (const commands of folder) {
					const command = require(`../../commands/${files}/${commands}`);

					delete require.cache[require.resolve(`../${files}/${commands}`)];
					client.aliases.delete(command.help.aliases);
					let commandName = commands.split(".")[0];
					console.log("Перезагрузка команды: " + commands);
					client.commands.set(commandName, command);
					command.help.aliases.forEach(alias => {
						client.aliases.set(alias, commandName);
					});
				}
			}
			return message.channel.send(`Команды перезагружены`);
		})
		.catch(collected => {
			return message.channel.send(
				":x: | Время вышло! Действия команд перезагрузки отменены!"
			);
		});
};

module.exports.help = {
	name: "reload-all",
	description:
		"Эта команда используется для перезагрузки всех команд без перезагрузки / перезапуска бота.",
	usage: "reload-all",
	accessableby: "Bot Owners",
	aliases: [],
};
