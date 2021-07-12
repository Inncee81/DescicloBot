const fs = require('fs');
var ML = require("./configs/ml.json");

const src = "./configs/ml.json";

module.exports = {
	read: async function(msg) {
		/*if (msg.content == "<@!763883155987759104>" || msg.content == "<@763883155987759104>") {
			var respostar = [
				"**<@!" + msg.author.id + "> NÃO ME PINGA PORRA!!**",
				`<@!${msg.author.id}> te mandei um pr0n`,
				"<@!" + msg.author.id + "> vai tomar noku",
				"<@!" + msg.author.id + "> seu corno fiadaputa!",
				`<@!${msg.author.id}> se você não parar eu vou te mandar pr0n, tô avisando!`,
				`enfia esse ping no seu cu <@!${msg.author.id}> estupido`
			];

			var count = Math.floor(Math.random() * (respostar.length -1));

			if (count == 1) {
				msg.author.send("https://img-hw.xvideos-cdn.com/videos/thumbs169lll/a5/44/c9/a544c946708baf114b77be287c39c394/a544c946708baf114b77be287c39c394.17.jpg");
			}

			msg.reply(respostar[count]);
		} else {
			if (isPing(msg)) {
				var contains = [];

				for (var x = 0; x < ML.data.length;x++) {
					var data = ML.data[x];
					var t = 0;
					var f = 0;

					for (var y = 0; y < data.input.length;y++) {

						for (var z = 0; z < data.input[y].length;z++) {
							if (msg.content.toLowerCase().includes(data.input[y][z])) {
								contains[y] = true;
								z = data.input[y].length;
							} else {
								contains[y] = false;
							}
						}
					}

					for (var y = 0; y < contains.length;y++) {

						if (contains[y]) {
							t++;
						} else {
							f++;
							contains = new Array();
						}
					}

					if (contains.length > 0) {
						var random_number = Math.floor(Math.random() * (ML.data[x].output.length));
						var response = ML.data[x].output[random_number];
						if (typeof(response) == "function") {
							response(msg);
						} else if (typeof(response) == "string") {
							msg.reply(response);
						}
						
						x = ML.data.length;
					} else {
						console.log("AI")
						var txt = "";
						if (msg.content.toLowerCase().replace(msg.content.startsWith("<@!763883155987759104>"))) {
							txt = msg.content.replace("<@!763883155987759104>","");
						} else {
							txt = msg.content.replace("<@763883155987759104>","");
						}
						

						//msg.reply("PIMBA!");
						/ *msg.channel.send("Eu não sei como responder isso. Poderia me ensinar?");
						msg.channel.send("https://tenor.com/view/please-cat-pretty-please-begging-cute-gif-10675419");* /
					}
				}
			}
		}*/
	},

	write: async function(msg) {
	/*	var question = msg.referencedMessage.content.toLowerCase();
		var reply = msg.content.toLowerCase();
		var questionAlreadyLearned = false;
		var replyAlreadyLearned = false;
		var dataSet = ML.data.length;
		var inputSet = 0;

		if (question &&
			!(question.startsWith("<@!763883155987759104>") ||
			question.startsWith("<@763883155987759104>")) &&
			question.length > 7
		) {
			//procura por um input igual
			try {
			for (var x = 0; x < ML.data.length; x++) {
				for (var y = 0; y < ML.data[x]["input"].length; y++) {
					if (ML.data[x]["input"][y][0] == question) {
						dataSet = x;
						inputSet = y;
						questionAlreadyLearned = true;
						x = ML.data.length;
					}
				}
			}

			} catch (er) {

			}
			console.log("tarefa sobreviveu");

			var outputSet = -1;

			if (!ML.data[dataSet]) {
				ML.data[dataSet] = {
					"input": [],
					"output": []
				};
				inputSet = ML.data[dataSet]["input"].length;
				outputSet = ML.data[dataSet]["output"].length;
			}
		
			//procura por um output igual
			for (var x = 0; x < ML.data[dataSet]["output"].length; x++) {
				if (ML.data[dataSet]["output"][x] == reply) {
					replyAlreadyLearned = true;
					outputSet = x;
				}
			}

			if (outputSet = -1) {
				outputSet = ML.data[dataSet]["output"].length;
			}
		
			if (!questionAlreadyLearned) {
				console.log(`pergunta "${question}" não perguntada`);
				ML.data[dataSet]["input"][inputSet] = [question];
			}

			if (!replyAlreadyLearned) {
				console.log(`resposta "${reply}" não aprendida`);
				ML.data[dataSet]["output"][outputSet] = reply;
			}

			fs.writeFile("configs/ml.json",JSON.stringify(ML,null,2), function writeJSON(err) {
  				if (err) return console.log(err);
			});
		}*/
	}
}
/**
 * pra não ficar escrevendo a mesma hora (checa se a mensagem começa com um ping).
 */
function isPing(msg) {
	return (msg.content.toLowerCase().startsWith("<@!763883155987759104>") || msg.content.toLowerCase().startsWith("<@763883155987759104>"));
}

