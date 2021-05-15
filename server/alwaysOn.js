const fetch = require("node-fetch");
function alwaysOn() {
	setInterval(async () => {
		await fetch("").then(console.log("ПИНГАНУЛИ!"));
	}, 240000);
}

module.exports = alwaysOn;
