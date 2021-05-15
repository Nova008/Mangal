module.exports = async (client, message, result) => {
	let i = 0;
	message.channel.send(
		`**Выберите вариант ниже**\n${result
			.map(song => `**${++i}**. ${song.name} - \`${song.formattedDuration}\``)
			.join("\n")}\n*Введите что-нибудь еще или подождите 60 секунд, чтобы отменить*`
	);
};
