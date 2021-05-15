const Discord = require("discord.js");
function doMagic8BallVoodoo() {
	var rand = [
		"Да",
		"Нет",
		"Почему ты еще пытаешься?",
		"Как вы думаете? НЕТ",
		"Может быть",
		"Никогда",
		":)",
		"иди на #уй))).......'это пранк бро!!!",
	];

	return rand[Math.floor(Math.random() * rand.length)];
}

module.exports.run = async (client, message, args) => {
	if (!args[0])
		return message.channel.send(
			"Пожалуйста, сначала задайте мне вопрос, чтобы получить доступ к этой команде."
		);
	message.channel.send("Мой Ответ: " + doMagic8BallVoodoo());
};

module.exports.help = {
	name: "8ball",
	description:
		"Эта команда используется для того, чтобы спросить бота, что он хотел бы ответить как 8ball.",
	usage: "d!8ball <questions>",
	accessableby: "Member",
	aliases: [],
};
