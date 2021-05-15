module.exports.run = async (client, message, args) => {
	if (!message.member.voice.channel)
		return message.channel.send(
			`${client.emotes.error} | Вы должны быть в голосовом канале!`
		);
	if (!client.distube.isPlaying(message))
		return message.channel.send(
			`${client.emotes.error} | Ничего не играет!`
		);
	let queue = client.distube.skip(message);
	message.channel.send(
		`${client.emotes.success} | Пропущено! Сейчас играет:\n${queue.songs[0].name}`
	);
};

module.exports.help = {
	name: "skip",
	description: "Эта команда используется для пропуска песен.",
	usage: "skip",
	accessableby: "Manage Server",
	aliases: [],
};
