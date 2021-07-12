const Global = require('../Global');
const Discord = require('discord.js');

module.exports = {
	show: function(msg,cmd) {

		switch (cmd) {
			case "help":
				msg.channel.send("https://www.youtube.com/watch?v=xIS8HymYvvM");
			break;

			case "diga":
				var param = [
					["msg (obrigatório)","A mensagem que eu enviarei"]
				];

				embed(msg,cmd,"me manda dizer alguma porra","pau no cu!", param);
			break;

			case "diga-no-canal":
				var param = [
					["canal (obrigatório)","a TAG ou o ID do canal que eu enviarei. Me recuso a mandar em certos canais."],
					["msg (obrigatório)","A mensagem que eu enviarei"]
				];

				embed(msg,cmd,"me manda dizer alguma merda em tal canal","<#311260823001628674> pau no cu!", param);
			break;

			case "minha-pica":
				var param = [];

				embed(msg,cmd,"Bora medir o tamanho da rola, quem tiver a maior ganha.","", param);
			break;

			case "meme":
				var param = [];

				embed(msg,cmd,"**__EM DESENVOLVIMENTO__**\n\npede um meme.","", param);
			break;

			case "color":
				var param = [
					["HEX (obrigatório)","A cor em hexadecimal (não se esqueça de incluir o `#` na frente, cacete!"]
				];

				embed(msg,cmd,"Troca a cor das minhas mensages","#CC0000", param);
			break;

			case "reddit":
				var param = [
					["sub (opcional)","O nome do subreddit. exemplo r/`hentai`"]
				];

				embed(msg,cmd,"envia algo do reddit","meme", param);
			break;

			case "prefix":
				var param = [
					["prefixo (obrigatório)","prefixo de texto, pode incluir espaços."]
				];

				embed(msg,cmd,"troca o meu prefixo no server","porra.", param);
			break;

			case "castigar":
				var param = [
					["usuário (obrigatório)","O ping ou o ID do usuário em que você castigará dolorosamente."],
					["horas (opcional)", "Por quanto tempo este usuário estará castigado? (pode conter casas decimais).\nCaso o valor não for informado o usuário será castigado por tempo indeterminado."]
				];

				embed(msg,cmd,"Se você é sadomasoquista, esta função é para você. Apenas escolha um alvo e eu castigarei-o para você!","<@562419742640570368> 0.5", param);
			break;

			case "descastigar":
				var param = [
					["usuário (obrigatório)","O ping ou o ID do usuário em que você descastigará."],
					["horas (opcional)", "Por quanto tempo este usuário estará descastigado? Util se você for fazer uma interrogação mais precisa de um suspeito."]
				];

				embed(msg,cmd,"Caso você sinta pena do cilindreiro, você pode dar um arrego de 2 minutos para ele, ou pagar a fiança.","<@562419742640570368> 0.5", param);
			break;

			case "kick":
				var param = [
					["usuário (obrigatório)","O ping ou o ID do usuário em que você vai enxotar."]
				];

				embed(msg,cmd,"Chuta o rabo de um usuário.","<@562419742640570368>", param);
			break;

			case "regras":
				var param = [
					["modo","O modo de modificação de regras. `add` cria uma nova regra enquanto `remove` apaga a regra pelo numero."],
					["opts", "**remove**: em remove, `opts` é o numero da regra a ser removida.\n\n**add**: em add, esse valor se divide em dois. sendo `titulo` >> `descrição`. note o \">>\" que separa o titulo da descrição."]
				];

				embed(msg,cmd,"Os pobretões tão rodando a baiana? **SEUS PROBLEMAS ACABARAM!!**","add Não pode cuspir >> Aqui não é lugar para babuínos!", param);
			break;

			case "ban":
				var param = [
					["usuário (obrigatório)","O ping ou o ID do usuário em que será usado a eutanásia."],
					["motivo (opcional)", "Banido por..."]
				];

				embed(msg,cmd,"caso alguém seja insuportavel, use este comando.","<@562419742640570368> fazer sexo", param);
			break;

			case "criar-artigo":
				var param = [
					["nome do artigo (obrigatório)",`Nome do artigo (**lembre-se de trocar os espaços por \`_\`, pois é assim que funciona na Desciclopédia, __arregão__!**)`],
					["introdução (obrigatório)","Um texto (quanto mais grande melhor) que vai ajudar a AI a terminar o artigo. deve ser no minimo uma frase de 64 caracteres, deve conter **pontuação final**."]
				];

				embed(msg,cmd,"Ajuda você a criar artigos. Caso ache a AI um pouco inconsistente, edite a memória dela [aqui](https://desciclopedia.org/wiki/Usuário:DiscordBot/WikiAI.json) mas antes leia o [manuel](https://desciclopedia.org/wiki/Usuário:DiscordBot/WikiAI).","Puta '''Puta''' é uma espécie de verme que vive na venezuela e que possuí uma boa aparência.", param);
				break;

			case "xvideos":
				var param = [
					["tipo (opcional, requer argumento `tags`)", "o tipo de busca, se vai ser por `tag` (ou `t`), por busca (`query` ou `q`) ou por lista (`l`).\n\n • `l=[página]` ─ lista todos os videos da pesquisa. `página` é um valor opcional que caso não for especificado (remover o `=`). listará a primeira página.\n • `q` ─ pesquisa por um determinado termo. Eg. `Velho fodendo cachorro`.\n • `t` ─ pesquisa baseada em tags. Eg. `asian black`."],
					["tags... (opcional, requer argumento `tipo`)","as tags separadas por espaço, e as buscas são únicas."]
				];

				embed(msg,cmd,"Manda uma delícia **branca** [(ou não)](https://desciclopédia.org/wiki/Ou_não)","q sexo anal", param);
			break;

			default:
				msg.channel.send("Esse comando não existe, **porra**. Se quiser que ele exista abre uma votação no <#774829640489107456>");
		}
	}
}

function embed(msg,cmd,desc,example,params) {
	var pre = Global.config["prefix"];

	var embed = new Discord.MessageEmbed()
		.setColor("#CC0000")
		.setTitle(cmd)
		.setDescription(desc);

	for (var x = 0; x < (params.length); x++) {
		embed.addField(params[x][0], params[x][1]);
	}

	embed.addField("Exemplo: ", `\`${pre}${cmd} ${example}\``);

	msg.channel.send({embeds:[embed]});
}