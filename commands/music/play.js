module.exports.run = async (client, message, args) => {
	if (!message.member.voice.channel)
		return message.channel.send(
			`${client.emotes.error} | Вы должны быть в голосовом канале!`
		);
	let string = args.join(" ");
	if (!string)
		return message.channel.send(
			`${client.emotes.error} | Пожалуйста, введите URL песни или запрос для поиска.`
		);
	try {
		client.distube.play(message, string);
	} catch (e) {
		message.channel.send(`${client.emotes.error} | Ошибка: \`${e}\``);
	}
};

module.exports.help = {
	name: "play",
	description: "Эта команда используется для воспроизведения музыки, которая вам нравится.",
	usage: "play <музыка>",
	accessableby: "Members",
	aliases: ["p"],
};
