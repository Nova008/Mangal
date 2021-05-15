module.exports = async (client, message, queue, playlist, song) => {
	message.channel.send(
		`${client.emotes.play} | Играть \`${playlist.name}\` плейлист (${
			playlist.songs.length
		} songs).\nСейчас играет \`${song.name}\` - \`${
			song.formattedDuration
		}\`\n${client.status(queue)}`
	);
};
