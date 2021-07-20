const Global = require("../Global.js");
const Discord = require("discord.js");

var conta = Global.accounts.desciclopedia;

module.exports = {
	/**
	 * 
	 * @param {Discord.Message} msg 
	 * @param {*} m 
	 */
	show: async function(msg,m) {
		//se o usuário não sou eu
		if (
			!(msg.member.id == "389292303933767690" ||
			msg.member.id == "562419742640570368")
		) {
			msg.reply("Esse comando é só pro mestre.");
			return false.valueOf;
		}

		let button = new Discord.MessageButton({
			label: "SEXO!",
			url: "https://www.youtube.com/watch?v=dQw4w9WgXcQ",
			style: "LINK",
			//customId: "DESCICLOBOT-DEBUG"
		});
		msg.reply({
			content: "Clique aqui",
			components: [new Discord.MessageActionRow({
				components: [button]
			})]
		}).catch((r) => {
			msg.reply("erro: " + r);
		});
	}
}