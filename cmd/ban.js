module.exports = {
	show: async function(msg, m) {
		var motivo = "nada... (confia no pai)";

		if(m[1]) {
			let banido = m[1].replace('<', "").replace('>', "").replace('@', "").replace('!', "");
			let account = msg.guild.members.cache.get(banido);

			if (!account) {
				return msg.channel.send("Você precisa ir a uma clínica para tratar a sua esquisofrenia.");
			}

			if (!account.bannable) {
				return msg.reply("Eu não vou banir esse cara, séloko."); //Eu não tenho permissão pra isso, **me dá agora ou eu muto todo mundo!!**
			}

			if (!msg.member.permissions.has("BAN_MEMBERS")) {
				return msg.reply("Não obedeço as suas ordens, seu broxa!");
			}

			await (function(){if (m[2]) {
				motivo = "";
				for (var x = 2; x < m.length; x++) {
					motivo += m[x] + " ";
				}
			}})();
			msg.channel.send(`<@${msg.author.id}> baniu <@${banido}> por ${motivo}`);
			msg.delete().catch(console.error);
			await account.send("https://tenor.com/view/ednaldo-pereira-banido-desbanido-meme-meme-banido-gif-19429642").catch(console.error);
			await account.send(`***__VOCÊ FOI BANIDO, MERMÃO!__***\n\n Você foi banido por ${motivo}`).catch(console.error);
			await account.ban({reason: motivo}).catch(console.error);
		} else {
			return msg.channel.send("Não vou banir o <@242721083629764608>, seu sysop burro!");
		}
	}
}