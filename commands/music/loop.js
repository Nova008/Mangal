module.exports.run = async (client, message, args) => {
	if (!message.member.voice.channel)
		return message.channel.send(
			`${client.emotes.error} | Вы должны быть в голосовом канале!`
		);
	if (!client.distube.isPlaying(message))
		return message.channel.send(
			`${client.emotes.error} | Вы должны быть в голосовом канале!`
		);
	let mode = null;
	switch (args[0]) {
		case "Откл":
			mode = 0;
			break;
		case "Музыка":
			mode = 1;
			break;
		case "Очередь":
			mode = 2;
			break;
	}
	mode = client.distube.setRepeatMode(message, mode);
	mode = mode ? (mode == 2 ? "Очередь" : "Музыка") : "Откл";
	message.channel.send(
		`${client.emotes.repeat} | Установлен режим повтора на \`${mode}\``
	);
};

module.exports.help = {
	name: "loop",
	description: "Эта команда используется для отключения песен в музыкальной системе.",
	usage: "loop <Откл/музыка/очередь>",
	accessableby: "Подключение к голосовому каналу",
	aliases: [],
};
