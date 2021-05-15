const Discord = module.require("discord.js");
const weather = require("weather-js");

module.exports.run = async (bot, message, args) => {
	weather.find(
		{ search: args.join(" "), degreeType: "C" },
		function (err, result) {
			if (err) message.channel.send(err);

			//If the place entered is invalid
			if (result.length === 0) {
				message.channel.send("**Введите область**");
				return;
			}

			//Variables
			var current = result[0].current; //Variable for the current part of the JSON Output
			var location = result[0].location; //This is a variable for the location part of the JSON Output

			//Sends weather log in embed
			let embed = new Discord.MessageEmbed()
				.setDescription(`**${current.skytext}**`) //How the sky looks like
				.setAuthor(`Погода для ${current.observationpoint}`) //Shows the current location of the weater
				.setThumbnail(current.imageUrl) //Sets thumbnail of the embed
				.setColor(0x00ae86) //Sets the color of the embed
				.addField("Часовой пояс", `UTC${location.timezone}`, true) //Shows the timezone
				.addField("Тип степени", location.degreetype, true) //Shows the degrees in Celcius
				.addField("Температура", `${current.temperature}`, true)
				.addField("Как будто", `${current.feelslike} Degrees`, true)
				.addField("Скорость ветра", current.winddisplay, true)
				.addField("Мокрая скорость", ` ${current.humidity}%`, true)
				.addField("Неделя", `${current.day}`, true)
				.addField("Дата", `${current.date}`, true)
				.setFooter(
					`©2021 Mangal⚙ | Запрошеннo ${message.author.username}#${message.author.discriminator}`
				);

			//Display when it's called
			message.channel.send(embed);
		}
	);

	message.delete();
};
module.exports.help = {
	name: "weather",
	description:
		"Проверяйте погоду в вашем регионе или районе в соответствии с новейшим климатическим / погодным статусом",
	usage: "weather <расположение/район>",
	accessableby: "Members",
	aliases: [],
};
