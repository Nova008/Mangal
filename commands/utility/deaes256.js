const Cryptr = require("cryptr");

const decrypt = (text, key) => {
	let cryptr = new Cryptr(key);
	return cryptr.decrypt(text);
};

module.exports.run = async (client, message, args) => {
	// eslint-disable-line no-unused-vars
	try {
		if (!args[0])
			return message.channel.send(
				"Вам нужно ввести ключ для расшифровки текста!"
			);
		if (!args[1])
			return message.channel.send("Вам нужно ввести текст для расшифровки!");

		message.channel.send(decrypt(args.slice(1).join(" "), args[0]));
	} catch (err) {
		message.channel.send("Это была ошибка!\n" + err).catch();
	}
};

module.exports.help = {
	name: "dae256",
	description:
		"Эта команда используется для расшифровки ваших текстовых данных с помощью расшифровки AES256.",
	usage: "dae256 <зашифрованные-данные>",
	accessableby: "Member",
	aliases: [],
};
