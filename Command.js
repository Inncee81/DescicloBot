const http = require('follow-redirects').https;
const Discord = require('discord.js');

const Global = require('./Global');
const AI = require('./AI');
const Help = require("./cmd/help");
const MinhaPica = require("./cmd/minha-pica");
const XVideos = require("./cmd/xvideos");
const Ban = require("./cmd/ban");
const Kick = require("./cmd/ban");
const Regras = require("./cmd/regras");
const Reddit = require("./cmd/reddit");
const Ensinar = require("./cmd/ensinar");
const Debug = require("./cmd/debug");
//const Avatar = require("./cmd/avatar"); em teste

const p = "╚prefix╚";

module.exports = {
	add: function(name, params, desc) {
		Global.help += "`" + name + " " + params + "` - " + desc + "\n";
		Global.commands += name;
	},


	addConfig: function(name, params, desc) {
		Global.configHelp += "`config." + name + " " + params + "` - " + desc + "\n";
	},

	execute: async function(msg) {
		const m = msg.content.replace(Global.config["prefix"], "╚prefix╚").split(" ");

		switch (m[0]) {
			//manda links de artigos
			case p + 'config.dpLinks':
				if (!msg.member.permissions.has("ADMINISTRATOR")) {
					msg.channel.send("Sou baba ovo do ADMIN!");
				} else {
					if (m[1] === 'true') {
						msg.channel.send("beleza meu chapa, de agora em diante vou mandar artigos da Desciclopédia de tempo em tempo.\nvocê pode querer ajustar o tempo nas configs");
						Global.config.settings.dpLink = true;
						dpLink(msg);
					} else if (m[1] === 'false') {
						Global.config.settings.dpLink = false;
						msg.channel.send("ta bom, n vou mais te encomodar com essa merda.");
					} else {
						msg.channel.send("Vai tomar no cu, escreve direito **PORRA**!");
					}
				}
				break;

			//tempo de intervalo dos links
			case p + 'config.dpLinkTime':
				if (!msg.member.permissions.has("ADMINISTRATOR")) {
					msg.channel.send("e quem é você pra me dizer oq fazer?");
				} else {
					Global.config["settings"]["dpLinkTime"] = (parseInt(m[1]) * 3600000) + (parseInt(m[2]) * 60000) + (parseInt(m[3]) * 1000);

					msg.channel.send("tempo de intervalo dos links da dp mudado para " + m[1] + " horas, " + m[2] + " minutos e " + m[3] + " segundos");
				}
				break;

			//mensagens de bem vindo
			case p + 'config.welcomeMessages':
				if (!msg.member.permissions.has("ADMINISTRATOR")) {
					msg.channel.send("Eu quero a mamãe!");
				} else {
					if (m[1] === 'true') {
						Global.config.settings.welcomeMessages = true;
						msg.channel.send("Só pra você mamãe!");
						msg.channel.send(":heart:");
					} else if (m[1] === 'false') {
						Global.settings.welcomeMessages = false;
						msg.channel.send("Só pra você mamãe!");
						msg.channel.send(":heart:");
					} else {
						msg.channel.send("mamãe, eu estou tentando ajudar mas você tem que escrever direito!");
					}
				}
				break;
			//função config
			case p + 'config':
				if (!msg.member.permissions.has("ADMINISTRATOR")) {
					msg.channel.send("Eu só recebo ordens do ADMIN.");
				} else {
					var e = new Discord.MessageEmbed().setColor(Global.color).setDescription(Global.configHelp);
					msg.channel.send("Aqui vai todas as configs:");
					msg.channel.send({
						embeds: [e]
					});
				}
				break;
				
			//função diga
			case p + 'diga':
				if (!m[1]) {
					msg.channel.send("Por favor, faz direito!");
				} else {
					if (msg.channel.id == "311260823001628674" || msg.member.permissions.has("ADMINISTRATOR") || msg.member.roles.cache.some(r => r.id === "815591892003454986")) {
						var txt = "";
						for (var x = 1; x < m.length; x++) {
							txt = txt + m[x] + " ";
						}
						msg.channel.send(txt);
					} else {
						msg.channel.send("**VOCÊ NÃO TEM PERMISSÃO AQUI, __OTÁRIO__!**");
					}
				}
				break;

			//diga no canal
			case p + 'diga-no-canal':
				if (!m[2] || m[1].includes("474975924803338254") || (!msg.member.permissions.has("ADMINISTRATOR")  || !msg.member.roles.cache.some(r => r.id === "815591892003454986"))) {
					msg.channel.send("Por favor, faz direito!");
					msg.channel.send("Devido à tentativas de spam, agora apenas ADMINS podem usar esse comando. **perdeu preiboi!**");
				} else {
					var txt = "";
					for (var x = 2; x < m.length; x++) {
						txt = txt + m[x] + " ";
					}
					Global.client.channels.cache.get(m[1].replace('<', '').replace('#', '').replace('>', '')).send(txt);
				}
				break;

			//função prefix
			case p + 'prefix':
				if (!m[1] || (!msg.member.permissions.has("ADMINISTRATOR")  || !msg.member.roles.cache.some(r => r.id === "815591892003454986"))) {
					msg.channel.send("Seu vagabundo!! não vou te obedecer porque você ou não é ADMIN ou não digitou direito!");
				} else {
					Global.config["prefix"] = m[1];
					Global.save(JSON.stringify(Global.config), msg);
					msg.channel.send("Prefixo trocado para ``" + m[1] + "``");
				}
				break;

			//XVIDEOS
			case p + 'xquery':
				XVideos.query(msg,m);
				break;

			case p + 'regras':
				if (msg.member.permissions.has("ADMINISTRATOR") || msg.author.id === "389292303933767690" || msg.member.roles.cache.some(r => r.id == "815591892003454986")) {
					Regras.start(msg,m);
				} else {
					msg.channel.send("Diga-me, quem você pensa que é para mandar em mim?");
				}
				break;

			//função color
			case p + 'color':
				if (m[1].includes('#') && m[1].length === 7) {
					Global.config["color"] = parseInt(m[1].substr(1), 16);
					console.log(JSON.stringify(Global.config));
					Global.save(JSON.stringify(Global.config), msg);
					msg.channel.send("Cor trocada para " + m[1]);
				} else {
					msg.channel.send("Isso não é uma cor em hexadecimal, seu tonto!");
				}
				break;

			//função help
			case p + 'help':
				if (!m[1]) {
					msg.channel.send("Aqui vai uma lista de tudo o que eu sei fazer:");
					var e = new Discord.MessageEmbed().setColor(Global.config["color"]).setDescription(Global.help + "\n\n**ESTÁ FALTANDO ALGO?**\nClique [aqui](https://trello.com/c/4GXkNjsX/2-como-adicionar-um-pedido) para fazer uma sugestão ou clique [aqui](https://trello.com/b/PgWMhNFk/desciclobot) para checar o status do bot.\n\nPara saber mais digite `"+Global.config["prefix"]+"help <comando>`");

					msg.channel.send({
						embeds: [e]
					});
				} else {
					Help.show(msg,m[1]);
				}
				break;
			case p + 'castigar':
				var pode = true;
				if (!m[1] || (!msg.member.permissions.has("ADMINISTRATOR") || !msg.member.roles.cache.some(r => r.id === "815591892003454986"))) {
					pode = false;
				}
				if (m[1] || msg.author.id !== "389292303933767690") {
					pode = false
				}
				if (pode || (msg.member.permissions.has("ADMINISTRATOR") || msg.member.roles.cache.some(r => r.id === "815591892003454986")) || msg.author.id === "389292303933767690") {
					// 775537028179296318

					let castigado = m[1].replace('<', "").replace('>', "").replace('@', "").replace('!', "");
					let account = msg.guild.members.cache.get(castigado);
					let colosseum = Global.client.channels.cache.get("815406995250479164");

					colosseum.overwritePermissions([{
						id: "311359153807294465",
						deny: [
							"SEND_MESSAGES"
						]
					}],"Apedrejamento aberto devido a um usuário castigado.");
					//msg.guild.members.cache.get

					account.roles.add("543499663806824497").catch(console.error);
					account.roles.remove("311359153807294465").catch(console.error);
					if (m[2]) {
						msg.channel.send(`<@${msg.author.id}> castigou ` + m[1] + " por " + m[2] + " horas, deixa comigo!");
						setTimeout(async function() {
							account.roles.remove("543499663806824497","porque eu posso!");
							account.roles.add("311359153807294465").catch(console.error);
						}, parseFloat(m[2]) * 3600000);
					} else {
						msg.channel.send(`<@${msg.author.id}> castigou ` + m[1] + " por tempo indeterminado... (**NÃO VÁ ESQUECER!!**)");
					}

					msg.delete();

				} else {

					msg.channel.send("Por favor, mané, vc n vai conseguir fazer isso sse n for o meu mestre ou um ADMIN...\n\nSeu id é " + msg.author.id);
				}
				break;
			case p + 'descastigar':
				var pode = true;
				if (!m[1] || (!msg.member.permissions.has("ADMINISTRATOR") || !msg.member.roles.cache.some(r => r.id === "815591892003454986"))) {
					pode = false;
				}
				if (m[1] || msg.author.id !== "389292303933767690") {
					pode = false
				}
				if (pode || (msg.member.permissions.has("ADMINISTRATOR") || msg.member.roles.cache.some(r => r.id === "815591892003454986")) || msg.author.id === "389292303933767690") {
					// 775537028179296318

					let castigado = m[1].replace('<', "").replace('>', "").replace('@', "").replace('!', "");
					let account = msg.guild.members.cache.get(castigado);
					//msg.guild.members.cache.get

					account.roles.remove("543499663806824497").catch(console.error);
					account.roles.add("311359153807294465").catch(console.error);
					if (m[2]) {
						msg.channel.send(`${msg.author.id} descastigou ` + m[1] + " por " + m[2] + " horas, quando o tempo for excedido, ele vai voltar pro cilindro!");
						setTimeout(async function() {
							account.roles.add("543499663806824497","porque eu posso!");
							account.roles.remove("311359153807294465").catch(console.error);
						}, parseFloat(m[2]) * 3600000);
					} else {
						msg.channel.send(`<@${msg.author.id}> descastigou ${m[1]}`);
					}
					msg.delete();

				} else {

					msg.channel.send("Por favor, mané, vc n vai conseguir fazer isso sse n for o meu mestre ou um ADMIN...\n\nSeu id é " + msg.author.id);
				}
				break;
			case p + "meme":
				const somememe = require('somememe');
				const data = somememe.meme();
 
				data.then(function(result) {
    				msg.channel.send(result);
				});
				break;
			default:
				if (m[0].startsWith(p)) {
					var cmd_nick = m[0].replace(p,"").toLowerCase();
					
					try {
						var cmd = require(`./cmd/${cmd_nick}.js`);

						cmd.show(msg, m);
						delete require.cache[require.resolve(`./cmd/${cmd_nick}.js`)];
					} catch (err) {
						console.log(err);
						msg.channel.send("O comando não existe ou está bugado, meu chapa!");
					}
				}
		}
	},
	dpLink: async function(msg) {
		if (true) {
			var link = "http://desciclopedia.org/wiki/Especial:Aleat%C3%B3ria";

			setTimeout(function() {
				msg.guild.channels.cache.get("775064669009215488").send("Saca só esse artigo:").catch(() => {});

				var request = require('request');
				var r = request.get(link, function(err, res, body) {
					console.log(r.uri.href);

					msg.guild.channels.cache.get("775064669009215488").send(res.request.uri.href).catch(console.error);
				});

				if (true) {
					dpLink(msg);
				}
			}, 5000); //Global.config["settings"]["dpLinkTime"]
		}
	}
}

async function dpLink(msg) {
	if (true) {
		var link = "https://desciclopedia.org/wiki/Especial:Aleat%C3%B3ria";

		setTimeout(function() {
			msg.guild.channels.cache.get("775064669009215488").send("Saca só esse artigo:");

			var request = require('request');
			var r = request.get(link, function(err, res, body) {
				console.log(r.uri.href);

				msg.guild.channels.cache.get("775064669009215488").send(res.request.uri.href).catch(() => {});
			});

			if (true) {
				dpLink(msg);
			}
		}, 900000); //Global.config["settings"]["dpLinkTime"]
	}
}