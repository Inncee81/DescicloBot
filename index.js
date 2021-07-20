/**
 * arquivo principal, primeiro a ser executado.
 * Ele abre um servidor via "express" para receber pings.
 * 
 * Logo após ele inicializa o Bot e os comandos.
 */
require("dotenv").config();
const express = require('express');
const path = require('path');
const Command = require('./Command');
const Extra = require('./Extra');
const fs = require('fs');
var Global = require('./Global');
const Discord = require('discord.js');
const AI =  require("./AI.js");
const DatabaseUtils = require("./utils/DatabaseUtils.js");
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

//
const Markov = require('markov-strings').default;

const app = express();
const port = 8080;

//cria um servidor web (veja a pasta /html)
app.use(express.static(path.join(__dirname, 'html')));
app.listen(port, () => console.log(`Example app listening at http://localhost:${port}`));

//inicializa o firebase
firebase.initializeApp(Global.accounts.firebaseConfig);
Global.db = firebase.database();

// ================= START BOT CODE ===================
const client = new Discord.Client({intents:[Discord.Intents.FLAGS.GUILDS, Discord.Intents.FLAGS.GUILD_MESSAGES]});

//adiciona ao help:
Command.add('diga','<msg>',"me manda dizer uma mensagem");
Command.add('diga-no-canal','<canal> <msg>',"me manda dizer uma mensagem em determinado canal");
Command.add('dado','[max] [min]',"Rola um dado ~~como você~~.");
Command.add('minha-pica','',"bora ver quem tem a maior anaconda do servidor?");
Command.add('meme','',"faz gracinha");
Command.add('xvideos','[modo] [tags]',"manda recursos para sua pasta .pr0n");
Command.add('reddit','[sub]',"Envia uma bosta do reddit.");
Command.add('xquery','[tags]',"relativo á `xvideos query [tags]`");
Command.add('color','<hex>',"troca a cor das minhas mensagens");
Command.add('prefix','<px>',"troca o meu prefixo (padrão `dp --`)");
Command.add('regras','<add|remove> <opts>',"cria/remove uma regra");
Command.add('castigar','<usuário> [H]',"Manda o moleke pro xilindró, morô? `H` é um valor opcional");
Command.add('descastigar','<usuário> [H]',"Policiais corruptos usam essa função frequentemente. `H` é um valor opcional");
Command.add('kick','<usuário> [motivo]',"Chuta um cara pra fora do server.");
Command.add('ban','<usuário> [motivo]',"Expulsa um funkeiro do server.");
Command.add('tempban','<usuário> <M> <D> <H> [motivo]',"Expulsa um funkeiro do server.");
Command.add('config','',"Ativa/desativa funções");
//Command.add('avatar', '(nada) ou <usuário>', "Mostra o avatar de alguém ou de quem enviou a mensagem."); em teste

//configs (para admins)
Command.addConfig('welcomeMessages','[true|false]',"Ativa/desativa a função de bem vindo. default: true");
Command.addConfig('dpLinks','[true|false]',"Ativa/desativa links aleatórios da dp. default: false");
Command.addConfig('dpLinkTime','<H> <M> <S>',"troca o intervalo dos links aleatórios da dp. default: 0 1 30");

//quando é ativado...
client.on('ready', async function(msg,guild) {
	console.log(`Entrei, sou ${client.user.tag}!`);
	var link = "discord.gg/8WnVWzWUzB";

	//seta a presença
	client.user.setPresence({
		activities: [
			{
				name: 'virjões em ' + link,
				type: "WATCHING",
				url: `https://${link}`
			},
			{
				name: `confete em ${link}`,
				type: `PLAYING`,
				url: `https://${link}`
			},
			{
				name: `o caos no geral de ${link}`,
				type: `WATCHING`,
				url: `https://${link}`
			},
			{
				name: `a partida de truco em ${link}`,
				type: `STREAMING`,
				url: `https://${link}`
			},
			{
				name: `a baderna em ${link}`,
				type: `WATCHING`,
				url: `https://${link}`
			}
		],
		status: 'online'
	});

	//client.channels.cache.find(c => c.type === 'text').send("bot atualizado, configurações resetadas!");
	client.guilds.cache.forEach(g => {      
      	g.roles.fetch();
	});
});



//quando envia uma mensagem
client.on('messageCreate', async function(msg) {
	console.log("────────────────");
	Global.client = client;
	Extra.verifySpam(msg);

	/**
	 * todo: alterar o metodo de JSON
	 */
	try {
		if (!fs.existsSync("./configs/" + msg.guild.id + ".json")) {
    		fs.writeFile("./configs/" + msg.guild.id + ".json", '{"prefix": "dp --","color": 13369344,"dpLinkChannel":"0","settings": {"welcomeMessages": true,"dpLink": false,"dpLinkTime": 90000}}',function() {
				
			});
			fs.readFile("./configs/" + msg.guild.id + ".json","utf-8",function(err,data) {
					//console.log("leitura de criação:" + data);
					Global.config = JSON.parse(data);
				});
  		} else {
			fs.readFile("./configs/" + msg.guild.id + ".json","utf-8",function(err,data) {
					//console.log("leitura de entrada:" + data);
				Global.config = JSON.parse(data);
			});
		}
	} catch(err) {
		console.error(err);
	}

	/**
	 * checa se o autor é um bot
	 */
	if (!msg.author.bot) {
		//o autor não é um bot, executa um comando
  		Command.execute(msg);

		if (msg.type == "REPLY") {
			AI.write(msg);
		}

	} else {
		//o autor é um bot, e por isso o spam global é resetado
		Global.spamCount = 1
	}
	/**
	 * checa se o processo dos artigos já foi aberto
	 */
	if (Global.dpLinkExecuted == false) {
		Command.dpLink(msg);
		Global.dpLinkExecuted = true;
	}

	//Extra.checkMute(msg);
	
	console.log("────────────────");
});

/*client.on("messageDelete", async (msg) => {
	msg.channel.send("apagaram uma mensagem aí ó!");
});*/

//quando entra alguém novo
client.on('guildMemberAdd', async function(member) {
	if (Global.settings.welcomeMessages) {
  		const channel = member.guild.channels.cache.find(ch => ch.name === 'member-log');

		const mensagens = [
			`${member} se juntou à suruba!`,
			`Bem vindo, ${member}! Tome cuidado com o <@&763950486075867146>.`
		]

		const num = Math.floor(Math.random() * (mensagens.length + 1));

  		
    	/*member.guild.channels.get('channelID').send({
			embed: {
				color: Global.color,
				description: mensagens[num]
			}
		});*/
	}
});


client.login(process.env.DISCORD_TOKEN);