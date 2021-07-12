module.exports = {
	show: function(msg,m) {
		if (!m[1]) {
			if (msg.author.id === "389292303933767690") {
					msg.channel.send("<@!" + msg.author.id  + ">, você tem 2KM de linguiça!");
			} else if (msg.author.id === "553616974564032514") {
				msg.channel.send("<@!" + msg.author.id  + ">, sua linguiça está em constante decrescimento... uma pena!");
			} else {
				if (msg.member.permissions.has("ADMINISTRATOR")) {
					msg.channel.send("<@!" + msg.author.id  + ">, sua linguiça tem 1KM.");
				} else {
					var tamanho = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
					msg.channel.send("<@!" + msg.author.id  + ">, sua linguiça tem " + tamanho + "cm.");
				}
			}
		} else {
			var alvo = m[1].replace(/<|!|@|>/g,"");

			if (alvo === "389292303933767690") {
					msg.channel.send("<@!" + alvo  + "> tem 2KM de linguiça!");
			} else if (alvo === "553616974564032514") {
				msg.channel.send("a linguiça de <@!" + alvo  + "> está em constante decrescimento... uma pena!");
			} else {
				if (msg.member.permissions.has("ADMINISTRATOR")) {
					msg.channel.send("a linguiça de <@!" + alvo  + "> tem 1KM.");
				} else {
					var tamanho = Math.floor(Math.random() * (30 - 1 + 1)) + 1;
					msg.channel.send("a linguiça de <@!" + alvo  + "> tem " + tamanho + "cm.");
				}
			}
		}
	}
}