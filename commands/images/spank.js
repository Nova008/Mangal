const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
	if (!message.mentions.users.first())
		return message.reply("Вы должны упомянуть кого-то, чтобы отшлепать их");
	if (!message.channel.nsfw)
		return message.reply("О НЕТ НЕТ, NSFW не включен на этом канале `FBI OPEN UP!!!!!!!!!!!`");
	if (message.mentions.users.first().id === "766434423628496917")
		return message.reply(
			"Ты не можешь отшлепать мою Попку)).💔 Он отшлепает тебе задницу >:3"
        );
	
	if (message.mentions.users.first().id === "780199040229834765")
		return message.reply(
			"Ты не можешь отшлепать мою Попку)).💔 Мне 12 Тебя В Тюрьме Изнасилуют Петушара) >:3"
		);
	const { body } = await superagent.get("https://nekos.life/api/v2/img/spank");

	const embed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setTitle(
			`${
				message.mentions.users.first().username
			}, тебя отшлепали по заднице ${message.author.username} >:3`
		)
		.setImage(body.url)
		.setFooter(`©2021 Mangal⚙`);
	message.channel.send({ embed });
};

module.exports.help = {
	name: "spank",
	description: "Эта команда используется для создания отрывных изображений.",
	usage: "spank <упомянуть>",
	accessableby: "Member",
	aliases: [],
};
