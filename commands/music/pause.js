module.exports.run = async (client, message, args) => {
	if (!message.member.voice.channel)
		return message.channel.send(
			`${client.emotes.error} | Вы должны быть в голосовом канале!`
		);
	if (!client.distube.isPlaying(message))
		return message.channel.send(
			`${client.emotes.error} | Ничего не играет!`
		);
	let queue = client.distube.pause(message);
	message.channel.send(`${client.emotes.success} | Остановлен!`);
};
module.exports.help = {
	name: "pause",
	description:
		"Эта команда используется для приостановки музыки внутри музыкального канала.",
	usage: "pause",
	accessableby: "Members",
	aliases: [],
};
