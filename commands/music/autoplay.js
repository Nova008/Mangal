module.exports.run = async (client, message, args) => {
	if (!message.member.voice.channel)
		return message.channel.send(
			`${client.emotes.error} | Вы должны быть в голосовом канале!`
		);
	if (!client.distube.isPlaying(message))
		return message.channel.send(
			`${client.emotes.error} | Ничего не играет!`
		);
	let mode = client.distube.toggleAutoplay(message);
	message.channel.send("Установлен режим автовоспроизведения на `" + (mode ? "Вкл" : "Откл") + "`");
};

module.exports.help = {
	name: "autoplay",
	description:
		"Эта команда используется для включения или отключения функций автовоспроизведения для музыкальной системы.",
	usage: "autoplay",
	accessableby: "Member",
	aliases: [],
};
