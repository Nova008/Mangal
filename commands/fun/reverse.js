module.exports.run = async (client, message, args) => {
	try {
		if (!args[0])
			return message.reply("Вам нужно ввести текст, чтобы перевернуть эго!");

		const str = args.join(" ");
		let msg = await message.reply(str.split("").reverse().join(""));
		msg.react("🔁");
	} catch (err) {
		message.channel.send("Это была ошибка!\n" + err).catch();
	}
};

module.exports.help = {
	name: "reverse",
	description: "Эта команда используется для переворота слов.",
	usage: "reverse",
	accessableby: "Member",
	aliases: [],
};
