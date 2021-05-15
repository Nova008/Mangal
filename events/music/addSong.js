module.exports = async (client, message, queue, song) => {
	message.channel.send(
		`${client.emotes.success} | Добавлен ${song.name} - \`${song.formattedDuration}\` в очередь`
	);
};
