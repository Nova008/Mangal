module.exports.run = async (client, message, args) => {
	if (!message.member.voice.channel)
		return message.channel.send(
			`${client.emotes.error} | Вы должны быть в голосовом канале!`
		);
	if (!client.distube.isPlaying(message))
		return message.channel.send(
			`${client.emotes.error} | Ничего не играет!`
		);
	let volume = parseInt(args[0]);
	if (isNaN(volume))
		return message.channel.send(
			`${client.emotes.error} | Пожалуйста введите правильное число!`
		);
	client.distube.setVolume(message, volume);
	message.channel.send(
		`${client.emotes.success} | Громкость установлена ​​на \`${volume}\``
	);
};

module.exports.help = {
	name: "volume",
	description:
		"Эта команда используется для изменения громкости при воспроизведении песен.",
	usage: "volume <значение>",
	accessableby: "Member",
	aliases: [],
};
