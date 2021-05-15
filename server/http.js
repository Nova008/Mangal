const express = require("express");
const server = express();
server.all("/", (req, res) => {
	res.send("Mangal❗ Sieg Hael");
});

function keepAlive() {
	server.listen(3000, () => {
		console.log("Сервер Запушен!");
	});
}

module.exports = keepAlive;
