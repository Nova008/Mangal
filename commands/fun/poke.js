const Discord = require("discord.js");
const superagent = require("superagent");

module.exports.run = async (client, message, args) => {
	if (!message.mentions.users.first())
		return message.reply("Вы должны упомянуть кого-то, чтобы ткнуть их");
	if (message.mentions.users.first().id === client.user.id)
		return message.channel.send("<a:yayyy:497742636439044096>");
	if (message.mentions.users.first().id == message.author.id)
		return message.reply("ВТФ, если это возможно, начальник но я думою что нет))");
	const { body } = await superagent
		.get("https://nekos.life/api/v2/img/poke")
		.catch(e => {
			if (e) {
				message.channel.send("Ой, что-то сломалось ...");
				console.log(e);
			}
		});

	const embed = new Discord.MessageEmbed()
		.setColor("#ff9900")
		.setTitle(
			`${message.mentions.users.first().username}, тебя ткнули ${
				message.author.username
			}`
		)
		.setImage(body.url)
		.setFooter(`©2021 Mangal⚙`);
	message.channel.send({ embed });
};

module.exports.help = {
	name: "poke",
	description: "Эта команда используется для того, чтобы тыкать кому-нибудь",
	usage: "poke <упомянуть>",
	accessableby: "Members",
	aliases: [],
};
