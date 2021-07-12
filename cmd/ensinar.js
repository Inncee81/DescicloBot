const ML = require("../configs/ml.json");
const Discord = require("discord.js");

module.exports = {
	show: function(msg,m) {
		if (!m[1]) {
			msg.channel.send("vai me ensinar o que? __burro!__");
		} else {
			msg.channel.send("o cara quer me ensinar mas não sabe como.");
			msg.channel.send(":ok_hand:");
		}

		msg.channel.send("Aliás, a interface gráfica para me ensinar está sendo preparada primeiro.");
		var e = new Discord.MessageEmbed();
		e.setDescription("[clique aqui e encha o seu pau de virus](https://DescicloBot.eduappscdg.repl.co/ensinar)")
		msg.channel.send({embeds:[e]});
	}
}