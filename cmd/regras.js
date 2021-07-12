const src = "../configs/regras.json";

const fs = require('fs');
const regras = require(src);
const Discord = require('discord.js');
const Global = require('../Global');

module.exports = {
	show: async function(msg,m) {
		if (m[1] == "add" && m[2]) {
			let titulo = "";
			let descript = "";
			let descript_state = false;
			let r = new Discord.MessageEmbed();

			for (var x = 2; x < m.length; x++) {
				if (m[x] !== ">>") {
					if (descript_state) {
						descript += m[x] + " ";
					} else {
						titulo += m[x] + " ";
					}
				} else {
					descript_state = true;
				}
			}

			regras[regras.length] = {
				"titulo": titulo,
				"descript": descript
			}

			r.setTitle("A criar regra " + (regras.length - 1));
			r.addField((regras.length - 1) + " ─ " + titulo,descript);

			msg.channel.send({embeds:[r]});
			update(msg);
		} else if (m[1] == "remove" && m[2]) {
			let r = new Discord.MessageEmbed();
			let num = parseInt(m[2]);

			if (regras[num] || num == 0) {
				r.setTitle("A remover regra " + num);
				r.addField(num + " ─ " + regras[num].titulo,regras[num].descript);

				msg.channel.send({embeds:[r]});

				removeRegra(num);
				update(msg);
			} else {
				msg.channel.send("Essa mensagem não existe, ou está desligada. **beep!**");
			}
		} else {
			msg.channel.send("Cacete, mano! Você não faz nada direito!");
		}
	}
}

function update(msg) {
	let id = regras[0].massagem_id;
	let anal = Global.client.channels.cache.get(regras[0].anal);
	let embed = new Discord.MessageEmbed();

	if (id !== "") {
		anal.messages.fetch(id).then((message) => {
			message.delete().catch(console.error);
		});
	}

	regras[0].autor = msg.author.username;
	regras[0].autor_img = msg.author.avatarURL();

	embed.setAuthor("DescicloTV","https://cdn.discordapp.com/icons/311219128570478595/3dd4698762b78f1f54c693679f79cae4.png");
	embed.setDescription(regras[0].descript);

	for (var x = 1; x < regras.length; x++) {
		embed.addField(`${x} ─ ${regras[x].titulo}`,regras[x].descript);
	}
	
	anal.send(embed).then((message) => {
		regras[0].massagem_id = message.id;
	});

	fs.writeFile("configs/regras.json", JSON.stringify(regras,null,2), function writeJSON(err) {
  		if (err) return console.log(err);
	});
}

function removeRegra(num) {
	if (regras[num]) {
		for (var x = num; x < regras.length; x++) {
			if (regras[x + 1]) {
				regras[x] = regras[x + 1];
			}  else {
				delete regras[x];
			}
		}

		regras.length -= 1;
	}
}