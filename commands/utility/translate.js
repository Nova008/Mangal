const Discord = require("discord.js");
const request = require("request");

module.exports.run = (client, message, [args, ...words]) => {
	const regex = /[!*();,:@&=+$.\/?%#[\]]/g;

	//Commented langs just translate to english
	let langs = {
		af: "Африканский",
		sq: "Албанский",
		am: "Амхарский",
		ar: "Арабский",
		hy: "Армянский",
		az: "Азербайджанский",
		eu: "Баскский",
		be: "Белорусский",
		bn: "Бенгальский",
		bs: "Боснийский",
		bg: "болгарский",
		my: "Бирманский",
		ca: "Каталонский",
		ny: "Чичева (Чева, Ньянджа)",
		zh: "Китайский",
		hr: "Хорватский",
		cs: "Чешский",
		da: "Датский",
		nl: "Нидерландский",
		en: "Английский",
		eo: "Эсперанто",
		et: "Эстонский",
		fi: "Финский",
		fr: "Французский",
		gl: "Галицкий",
		gd: "Гэльский (шотландский)",
		ka: "Грузинский",
		de: "Немецкий",
		el: "Греческий",
		gu: "Гуджарати",
		ht: "Гаитянский Креольский",
		ha: "Хауса",
		he: "Иврит",
		hi: "Хинди",
		hu: "Венгерский",
		is: "Исландский",
		ig: "Игбо",
		id: "Индонезийский",
		in: "Индонезийский",
		ga: "Ирландский",
		it: "Итальянский",
		ja: "Японский",
		jv: "Яванский",
		kn: "Каннада",
		kk: "Казахский",
		km: "Кхмерский",
		ky: "Киргизский",
		ko: "Корейский",
		ku: "Курдский",
		lo: "Лаосский",
		la: "Латинский",
		lv: "Латышский (Латышский)",
		lt: "Литовский",
		lg: "Люксембургский",
		mk: "Македонский",
		mg: "Малагасийский",
		ms: "Малайский",
		ml: "Малаялам",
		mt: "Мальтийский",
		mi: "Маори",
		mr: "Маратхи",
		mh: "Маршалловы",
		mo: "Молдавский",
		mn: "Монгольский",
		ne: "Непальский",
		no: "Норвежский",
		nb: "Норвежский бокмол",
		nn: "Норвежский нюнорск",
		ps: "Пушту (Пушту)",
		fa: "Персидский (Фарси)",
		pl: "Польский",
		pt: "Португальский",
		pa: "Панджаби (Восточный)",
		ro: "Румынский",
		ru: "Русский",
		sm: "Самоанский",
		sr: "Сербский",
		sh: "Сербо-Хорватский",
		st: "Сесото",
		sn: "Шона",
		sd: "Синдхи",
		si: "Сингальский",
		sk: "Словацкий",
		sl: "Словенский",
		so: "Сомалийский",
		es: "Испанский",
		su: "Суданский",
		sw: "Суахили (Суахили)",
		sv: "Шведский",
		tl: "Тагальский",
		tg: "Таджикский",
		ta: "Тамильский",
		te: "Телугу",
		th: "Тайский",
		tr: "Турецкий",
		uk: "Украинский",
		ur: "Урду",
		uz: "Узбекский",
		vi: "Вьетнамский",
		cy: "Валлийский",
		fy: "Западно-фризский",
		xh: "Коса",
		yi: "Идиш",
		ji: "Ийдиш",
		yo: "Йоруба",
		zu: "Зулусский",
	};

	if (args == "list") {
		let langEntries = Object.entries(langs);
		let listOfDLangs = ``;

		for (const [short, long] of langEntries) {
			listOfDLangs += `${long} - ${short}\n`;
		}

		let embed1 = new Discord.MessageEmbed()
			.setColor(client.config.embedColor)
			.setTitle("Список языков, на которые Mangal❗ может переводить:")
			.setDescription(listOfDLangs)
			.addField(
				"Как использовать: ",
				"`yabe translate lang1-lang2 матерьял для перевода`"
			)
			.setTimestamp();

		message.channel.send(embed1);
		return;
	} else {
		let sourceLang = args[0] + args[1];
		let targetLang = args[3] + args[4];

		if (!langs.hasOwnProperty(sourceLang))
			return message.channel.send(
				`Язык источника \`${sourceLang}\` не существует.\n(если вы считаете, что это неправильно, составьте отчет об ошибке, используя \`bug\`)`
			);
		if (args[2] !== "-")
			return message.channel.send(
				'Пожалуйста, отформатируйте команду правильно, вот так\n\n`translate en-es "слово или предложение для перевода"`'
			);
		if (!langs.hasOwnProperty(targetLang))
			return message.channel.send(
				`Язык перевода \`${targetLang}\` не существует.\n(если вы считаете, что это неправильно, составьте отчет об ошибке, используя \`bug\`)`
			);
		if (words == "")
			return message.channel.send(
				"Укажите слово или предложение для перевода."
			);

		let words2translate = words.join(" ").toLowerCase().replace(regex, "");
		let link = `https://translate.googleapis.com/translate_a/single?client=gtx&sl=${sourceLang}&tl=${targetLang}&dt=t&ie=UTF-8&oe=UTF-8&q=${encodeURI(
			words2translate
		)}`;

		request.get(link, (error, response, body) => {
			if (error) console.log(error);

			try {
				let translation = JSON.parse(body);
				let embed = new Discord.MessageEmbed()
					.setDescription(translation[0][0][0])
					.setColor(client.config.embedColor);
				message.channel.send(
					`Переведено с ${langs[sourceLang]} на ${langs[targetLang]}:`
				);
				message.channel.send(embed);
			} catch (err) {
				console.log(err);
				message.channel.send(
					"Что-то пошло не так при переводе, проверьте, правильно ли вы отформатировали его, и повторите попытку. \ Или, если вы считаете, что это ошибка, сообщите об этом с помощью `bug`"
				);
			}
		});
	}
};

module.exports.help = {
	name: "translate",
	description:
		"Эта команда используется для перевода. Пример: translate zh-ru 你好, ответ: привет",
	usage: "translate <язык>-<для перевода язык> <текст>",
	accessableby: "Member",
	aliases: [],
};
