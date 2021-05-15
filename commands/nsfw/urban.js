const Discord = require("discord.js");
const urban = require("urban");

module.exports.run = async (bot, message, args) => {
	if (message.channel.nsfw == false)
		return message.channel.send("Это не канал NSFW");
	if (args.length < 1) return message.reply("Введите что-либо!");
	let XD = args.join(" ");

	urban(XD).first(json => {
		if (!json) return message.reply("Невозможно выполнить поиск!");

		let urbEmbed = new Discord.MessageEmbed()
			.setColor("00ff00")
			.setTitle(json.word)
			.setDescription(json.definition)
			.addField("Дать согласие", json.thumbs_up, true)
			.addField("Не согласен", json.thumbs_down, true)
			.setFooter(`Написано в городском ${json.author}`);

		message.channel.send(urbEmbed);
	});
};

module.exports.help = {
	name: "urban",
	description: "Эта команда используется для загрузки городских данных.",
	usage: "urban <искать материал>",
	accessableby: "NSFW/Member",
	aliases: [],
};
