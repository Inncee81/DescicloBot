var Global = require("../Global.js");
const Markov = require('markov-strings').default;
var brain = require("brain.js");
const net = new brain.NeuralNetwork();

//palavra no final da primeira frase + primeira palavra da segunda frase
var textGlue = [
	{ type: "obj-conj", text: "." },
	{ type: "obj-conj", text: "." }
];

var words = [
	//conjunção
	{ input: { "e": 1 }, output: { conj: 1 } },
	{ input: { "nem": 1 }, output: { conj: 1 } },
	{ input: { "mas": 1 }, output: { conj: 1 } },
	{ input: { "porém": 1 }, output: { conj: 1 } },
	{ input: { "todavia": 1 }, output: { conj: 1 } },
	{ input: { "contudo": 1 }, output: { conj: 1 } },
	{ input: { "portanto": 1 }, output: { conj: 1 } },
	{ input: { "no entanto": 1 }, output: { conj: 1 } },
	{ input: { "entretanto": 1 }, output: { conj: 1 } },
	{ input: { "porquanto": 1 }, output: { conj: 1 } },
	{ input: { "por isso": 1 }, output: { conj: 1 } },
	{ input: { "assim": 1 }, output: { conj: 1 } },
	{ input: { "logo": 1 }, output: { conj: 1 } },
	{ input: { "porque": 1 }, output: { conj: 1 } },
	{ input: { "que": 1 }, output: { conj: 1 } },
	{ input: { "pois": 1 }, output: { conj: 1 } },
	{ input: { "ou": 1 }, output: { conj: 1 } },
	{ input: { "caso": 1 }, output: { conj: 1 } },

	//pronome
	{ input: { "eu": 1 }, output: { pron: 1 } },
	{ input: { "tu": 1 }, output: { pron: 1 } },
	{ input: { "ele": 1 }, output: { pron: 1 } },
	{ input: { "ela": 1 }, output: { pron: 1 } },
	{ input: { "nós": 1 }, output: { pron: 1 } },
	{ input: { "vós": 1 }, output: { pron: 1 } },
	{ input: { "eles": 1 }, output: { pron: 1 } },
	{ input: { "elas": 1 }, output: { pron: 1 } },
	{ input: { "me": 1 }, output: { pron: 1 } },
	{ input: { "te": 1 }, output: { pron: 1 } },
	{ input: { "se": 1 }, output: { pron: 1 } },
	{ input: { "o": 1 }, output: { pron: 1, start_use: 1 } },
	{ input: { "a": 1 }, output: { pron: 1, start_use: 1 } },
	{ input: { "lhe": 1 }, output: { pron: 1 } },
	{ input: { "nos": 1 }, output: { pron: 1, start_use: 1 } },
	{ input: { "vos": 1 }, output: { pron: 1 } },
	{ input: { "os": 1 }, output: { pron: 1, start_use: 1 } },
	{ input: { "as": 1 }, output: { pron: 1, start_use: 1 } },
	{ input: { "lhes": 1 }, output: { pron: 1 } },
	{ input: { "mim": 1 }, output: { pron: 1 } },
	{ input: { "comigo": 1 }, output: { pron: 1 } },
	{ input: { "ti": 1 }, output: { pron: 1 } },
	{ input: { "contigo": 1 }, output: { pron: 1 } },
	{ input: { "si": 1 }, output: { pron: 1 } },
	{ input: { "consigo": 1 }, output: { pron: 1 } },
	{ input: { "conosco": 1 }, output: { pron: 1 } },
	{ input: { "convosco": 1 }, output: { pron: 1 } }
];

module.exports = {
	show: async (msg, m) => {
		//msg.channel.send("ninguém usa essa merda até eu limpar a memória do bot!");
		//return false;

		try {
			var WikiAI = require("../configs/wikiai.json");

			m.shift(); //remove o inicio do comando
			var title = m.shift().toLowerCase();
			var input = m.join(' ')[0].toUpperCase() + m.join(' ').slice(1).toLowerCase();
			var text = `==${title}==\n${input}`;

			var nova_msg = msg.channel.send("treinando ai...");

			net.train(words);

			const markov = new Markov({ stateSize: 3 });

			const options = {
				maxTries: 20, // Give up if I don't have a sentence after 20 tries (default is 10)

				// If you want to get seeded results, you can provide an external PRNG.
				prng: Math.random, // Default value if left empty

				// You'll often need to manually filter raw results to get something that fits your needs.
				filter: (result) => {
					return true //result.string.split(' ').length >= 2 //&& // At least 5 words
					//result.string.endsWith('.')             // End sentences with a dot.
				}

			}

			/*markov.import({
				corpus: Global.markov,
				options: options,,
			});*/

			markov.addData(Global.markov);


			//var exp = markov.export();//startWords: [input]
			//console.log(exp.startWords[0])

			var result = [input];
			for (var x = 0; x < 20; x++) {
				//console.log(result);
				var oldtext = result[result.length - 1];
				var pretext = markov.generate(options).string;
				var pretextL = oldtext.split(" ")[oldtext.split(" ").length - 1];
				var pretextF = pretext.split(" ")[0];

				var ltype = net.run(JSON.parse(`{"${pretextL}": 1}`));
				var ftype = net.run(JSON.parse(`{"${pretextF}": 1}`));
				var l = 0, f = 0;
				var lkey = "none", fkey = "none";

				if (!pretextL.endsWith(".")) {
					for (type in ltype) {
						if (ltype[type] > l) {
							lkey = type;
							l = ltype[type];
						}
					}
				}
	
				for (type in ftype) {
					if (ftype[type] > f) {
						fkey = type;
						f = ftype[type];
					}
				}

				if (f == 0) ftype = "none";
				if (l == 0) ltype = "none";

				if (oldtext.endsWith(".")) {
					console.log(lkey);
					if (lkey == "conj") {
						var Name = title.replaceAll("_", "");
						Name = Name[0].toUpperCase() + Name.slice(1);
						result[result.length] = Name + "% " + conj + " " + pretext;
					} else if (lkey == "none") {
						var Name = title.replaceAll("_", "");
						Name = Name[0].toUpperCase() + Name.slice(1);
						var prons = words.filter((obj) => {
							return (obj.output.pron ? true : false) && (obj.output.start_use ? true : false);
						})

						var xxx = Math.floor(Math.random() * (prons.length - 1));

						var pron = prons[xxx].input[0].toUpperCase() + prons[xxx].input.slice(1);
						console.log(pron);

						for (key in pron) {
							pron = key[0] + key.slice(1);
						}

						result[result.length] = pron + "& " + Name + " " + pretext;
					} else if (lkey == "pron") {

					}
				} else {
					if (fkey == "pron") {
						var conjs = words.filter((obj) => {
							return (obj.output.conj ? true : false);
						});

						var xxx = Math.floor(Math.random() * (conjs.length - 1));

						var conj = conjs[xxx].input;
						console.log(conj);

						for (key in conj) {
							conj = key;
						}

						result[result.length] = conj + "@ " + pretext;
					} else if (fkey == "none") {
						result[result.length - 1] += ".#";
						result[result.length] = pretext;
					} else if (fkey == "conj") {
						result[result.length - 1] += ",$";
						result[result.length] = pretext;
					}
				}
			}
			console.log(result);
			msg.channel.send(result.join(" ")).catch("erro");
		} catch (err) {
			console.log(err);
			msg.channel.send("```js\n" + err + "\n```");
		}
	}
}