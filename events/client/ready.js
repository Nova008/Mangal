module.exports = async client => {
	console.log("Готово!");
	const activities = [
		`${client.guilds.cache.size} Сервер(а)(ов)`,
		`${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)} Участников`,
	];

	let i = 0;
	setInterval(
		() =>
			client.user.setActivity(
				`.help | ${activities[i++ % activities.length]}`,
				{ type: "WATCHING" }
			),
		15000
	);
};
