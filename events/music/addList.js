module.exports = async (client, message, queue, playlist) => {
	message.channel.send(
		`${client.emotes.success} | Добавлен \`${playlist.name}\` плейлист (${
			playlist.songs.length
		} songs) стоят в очереди\n${client.status(queue)}`
	);
};
