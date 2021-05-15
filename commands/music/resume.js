module.exports.run = async (client, message, args) => {
	if (!message.member.voice.channel)
		return message.channel.send(
			`${client.emotes.error} | Вы должны быть в голосовом канале!`
		);
	let queue = client.distube.resume(message);
	message.channel.send(
		`${client.emotes.success} | Возобновлено! Сейчас играет:\n${queue.songs[0].name}`
	);
};

module.exports.help = {
	name: "resume",
	description: "Эта команда используется для возобновления воспроизведения музыки.",
	usage: "resume",
	accessableby: "Member",
	aliases: [],
};
