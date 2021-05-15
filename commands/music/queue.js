exports.run = async (client, message, args) => {
	let queue = client.distube.getQueue(message);
	if (!queue)
		return message.channel.send(
			`${client.emotes.error} | Ничего не играет!`
		);
	let q = queue.songs
		.map((song, i) => {
			return `${i === 0 ? "Играет:" : `${i}.`} ${song.name} - \`${
				song.formattedDuration
			}\``;
		})
		.join("\n");
	message.channel.send(`${client.emotes.queue} | **Очередь сервера**\n${q}`);
};

module.exports.help = {
	name: "queue",
	description: "Эта команда используется для получения очереди из музыкальной системы.",
	usage: "queue",
	accessableby: "Members",
	aliases: [],
};
