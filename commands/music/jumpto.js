module.exports.run = async (client, message, args) => {
	let queue = client.distube.getQueue(message);
	if (0 <= Number(args[0]) && Number(args[0]) <= queue.songs.length) {
		message.channel.send(`Прыгнул-а ${parseInt(args[0])} музыка!`);
		return client.distube
			.jump(message, parseInt(args[0]))
			.catch(err => message.channel.send("Неверный номер песни."));
	} else {
		message.channel.send(
			`Пожалуйста, используйте число между **0** и **${
				client.distube.getQueue(message).length
			}**   |   *(0: disabled, 1: Повторить песню, 2: Повторить всю очередь)*`
		);
	}
};

module.exports.help = {
	name: "jumpto",
	description: "Эта команда используется для перехода к песне в указанную очередь.",
	usage: "jumpto <номер очереди>",
	accessableby: "Members",
	aliases: [],
};
