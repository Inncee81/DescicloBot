module.exports = {
	show: async function(msg, m) {
		var motivo = "nada... (confia no pai)";

		if (!msg.member.hasPermission("BAN_MEMBERS")) {
			return msg.channel.send("Não vou te obedecer, otário!");
		}

		if(m[1]) {
			let banido = m[1].replace('<', "").replace('>', "").replace('@', "").replace('!', "");
			let account = msg.guild.members.cache.get(banido);

			if (!account) {
				return msg.channel.send("Você precisa ir a uma clínica para tratar a sua esquisofrenia.");
			}

			if (account.hasPermission("BAN_MEMBERS")) {
				return msg.reply("Eu não vou kickar esse cara, séloko."); //Eu não tenho permissão pra isso, **me dá agora ou eu muto todo mundo!!**
			}

			await (function(){if (m[2]) {
				motivo = "";
				for (var x = 2; x < m.length; x++) {
					motivo += m[x] + " ";
				}
			}})();
			msg.channel.send(`<@${msg.author.id}> kickou no pau de <@${banido}> por ${motivo}`);
			msg.delete().catch(console.error);
			await account.send("https://tenor.com/view/ednaldo-pereira-banido-desbanido-meme-meme-banido-gif-19429642");
			await account.send(`***__BOM, AGORA QUICA NO MEU PAU__***\n\n Você foi kickado por ${motivo}`);
			await account.kick({reason: motivo});
		} else {
			return msg.channel.send("Não vou kickar o <@242721083629764608>, seu sysop burro!");
		}
	}
}