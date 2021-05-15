module.exports.run = async (client, message, args) => {
	if (!message.member.voice.channel)
		return message.channel.send(
			`${client.emotes.error} | Вы должны быть в голосовом канале!`
		);
	if (!client.distube.isPlaying(message))
		return message.channel.send(
			`${client.emotes.error} | Ничего не играет!`
		);
	client.distube.stop(message);
	message.channel.send(`${client.emotes.success} | Остановился!`);
};

module.exports.help = {
	name: "stop",
	description: "Эта команда используется для остановки музыки.",
	usage: "stop",
	accessableby: "Member",
	aliases: ["s", "dc", "fuckoff", "disconnect"],
};
