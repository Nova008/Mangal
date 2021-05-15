const Cryptr = require("cryptr");

const encrypt = (text, key) => {
	let cryptr = new Cryptr(key);
	return cryptr.encrypt(text);
};

module.exports.run = async (client, message, args) => {
	// eslint-disable-line no-unused-vars
	try {
		if (!args[0])
			return message.channel.send(
				"Вам нужно дать ключ для шифрования текста!"
			);
		if (!args[1])
			return message.channel.send("Вам нужно дать текст для шифрования!");

		message.channel.send(encrypt(args.slice(1).join(" "), args[0]));
	} catch (err) {
		message.channel.send("Это была ошибка!\n" + err).catch();
	}
};

module.exports.help = {
	name: "aes256",
	description:
		"Эта команда используется для шифрования ваших текстовых данных с помощью шифрования AES256.",
	usage: "aes256",
	accessableby: "Member",
	aliases: [],
};
