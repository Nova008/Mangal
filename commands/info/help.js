const Discord = require("discord.js");

module.exports.run = async (bot, message, args) => {
	let helpArray = message.content.split(" ");
	let helpArgs = helpArray.slice(1);

	if (!helpArgs[0]) {
		const embed = new Discord.MessageEmbed()
			.setTitle("Mangal⚙Bot & Список команд")
			.setColor("GREEN")
			.setDescription(
				"**Префикс** `.`\nДля более подробной информации, пожалуйста, посетите: [Сюда](https://discord.gg/f3tq6Ep3Ja) и пригласите меня на свой сервер."
			)
			.addField("**📱Базовый**", "`help`, `ping`, `vote`, `setprefix`")
			.addField(
				"**⚙Утилиты**",
				"`aes256`, `avatar`, `channel`, `embed`, `roleinfo`, `reverse`, `snipe`, `stats`, `timer`, `translate`, `whois`, `weather`, `youtube`"
			)
			.addField(
				"**🎃Веселье**",
				"`8ball`, `cat`, `deaes256`, `kiss`, `meme`, `ngif`, `pat`, `poke`, `smug`, `spank`, `thigh`, `tickle`"
			)
			.addField(
				"**:frame_photo:Картинки**",
				"`circle`, `delete`, `gay`, `cmd`, `trigger`, `clyde`"
			)
			.addField(
				"**:musical_note:Музыка**",
				"`play`, `stop`, `skip`, `queue`, `autoplay`, `loop`, `volume`, `pause`, `resume`"
			)
			.addField(
				"**🛠️Модерацыя**",
				"`ban`, `clear`, `clearwarn`, `createemoji`, `kick`, `mute`, `rename`, `slowmode`, `unban`, `unmute`, `warn`, `warnings`"
			)
			.addField(
				"**:underage:NSFW**",
				"`4knsfw`, `anal`, `ass`, `hentai`, `holo`, `pussy`, `porn`, `spank`, `urban`"
			)
			.addField("**:gear:Пользовательская функция**", "`setprefix`")
			.setFooter(
				`©2021 Mangal⚙ | Эта команда запрошена ${message.author.username}#${message.author.discriminator}`
			);
		message.channel.send({ embed });
	}

	if (helpArgs[0]) {
		let command = helpArgs[0];

		if (bot.commands.has(command)) {
			command = bot.commands.get(command);
			let alia = command.help.aliases;
			if (command.help.aliases < 1) alia = "Без псевдонимов";

			var embed = new Discord.MessageEmbed()
				.setTitle(`**Команда: ${command.help.name}**`)
				.setDescription(
					`
            **Description:**\n\`\`\`${
							command.help.description ||
							"Для этой команды нет описания."
						}\`\`\`\n**Применение:**\n\`\`\`${
						command.help.usage || "Нет применения"
					}\`\`\`\n**Разрешения:**\n\`\`\`${
						command.help.accessableby || "Члены"
					}\`\`\`\n**Псевдонимы:**\n\`\`\`${alia}\`\`\``
				)
				.setColor("#4a4b4d")
				.setFooter(
					`©2021 Mangal⚙ | Эта команда запрошена ${message.author.username}#${message.author.discriminator}`
				);

			message.channel.send(embed);
		} else {
			var embeds = new Discord.MessageEmbed()
				.setTitle(`**Команда: ${helpArgs[0]}**`)
				.setDescription(
					`
            **Ответ:**
						\`\`\`Ошибка 666 не найдено\`\`\``
				)
				.setColor("#ff0000");

			return message.channel.send(embeds);
		}
	}
};

module.exports.help = {
	name: "help",
	description: "Эта команда используется для отображения всех команд.",
	usage: "help",
	accessableby: "Members",
	aliases: [],
};
