module.exports = async (client, message, err) => {
	message.channel.send(
		`${client.emotes.error} | Произошла ошибка: \`${err}\``
	);
};
