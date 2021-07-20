let Global = require("../Global.js");
let Discord = require("discord.js");
//const Markov = require('markov-strings').default;
let brain = require("brain.js");
const mimir = require("mimir");
let texts = require("../configs/artigo.json");
texts = JSON.stringify(texts).toLowerCase();
texts = JSON.parse(texts);
texts = textToWords(texts);

const fs = require("fs");
//let dicionario = mimir.dict(texts);
let palavras = require("../palavras.json");
var Desciclopedia = require("../core/Desciclopedia.js");

//palavra no final da primeira frase + primeira palavra da segunda frase
let textGlue = [
	{ type: "obj-conj", text: "." },
	{ type: "obj-conj", text: "." }
];

let words = [
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

//temas
let themes = {
	PORNOGRAFIA: 0,
	CARROS: 1,
	CIDADES: 2,
	PESSOAS: 3,
	JOGOS: 4,
	PRODUTOS: 5,
	TELEVISÃO: 6,
	LINGUAS: 7,
	TECNOLOGIA: 8,
	PIADA: 9
}

let chars = {
	"0": 0,
	"1": 1,
	"2": 2,
	"3": 3,
	"4": 4,
	"5": 5,
	"6": 6,
	"7": 7,
	"8": 8,
	"9": 9,
	"a": 10,
	"b": 11,
	"c": 12,
	"d": 13,
	"e": 14,
	"f": 15,
	"g": 16,
	"h": 17,
	"i": 18,
	"j": 19,
	"k": 20,
	"l": 21,
	"m": 22,
	"n": 23,
	"o": 24,
	"p": 25,
	"q": 26,
	"r": 27,
	"s": 28,
	"t": 29,
	"u": 30,
	"v": 31,
	"w": 32,
	"x": 33,
	"y": 34,
	"z": 71,
	"á": 35,
	"à": 36,
	"â": 37,
	"ã": 38,
	"é": 39,
	"è": 40,
	"ê": 41,
	"ẽ": 42,
	"í": 43,
	"ì": 44,
	"î": 45,
	"ĩ": 46,
	"ó": 47,
	"ò": 48,
	"ô": 49,
	"õ": 50,
	"ú": 51,
	"ù": 52,
	"û": 53,
	"ũ": 54,
	" ": 55,
	".": 56,
	",": 57,
	":": 58,
	"\"": 59,
	"(": 60,
	")": 61,
	"'": 62,
	"ç": 63,
	"-": 64,
	"+": 65,
	"/": 66,
	"!": 67,
	"?": 68,
	"$": 69,
	"=": 70,
	"%": 72,
	";": 73
}

let nums = {
	0: "0",
	1: "1",
	2: "2",
	3: "3",
	4: "4",
	5: "5",
	6: "6",
	7: "7",
	8: "8",
	9: "9",
	10: "a",
	11: "b",
	12: "c",
	13: "d",
	14: "e",
	15: "f",
	16: "g",
	17: "h",
	18: "i",
	19: "j",
	20: "k",
	21: "l",
	22: "m",
	23: "n",
	24: "o",
	25: "p",
	26: "q",
	27: "r",
	28: "s",
	29: "t",
	30: "u",
	31: "v",
	32: "w",
	33: "x",
	34: "y",
	71: "z",
	35: "á",
	36: "à",
	37: "â",
	38: "ã",
	39: "é",
	40: "è",
	41: "ê",
	42: "ẽ",
	43: "í",
	44: "ì",
	45: "î",
	46: "ĩ",
	47: "ó",
	48: "ò",
	49: "ô",
	50: "õ",
	51: "ú",
	52: "ù",
	53: "û",
	54: "ũ",
	55: " ",
	56: ".",
	57: ",",
	58: ":",
	59: "\"",
	60: "(",
	61: ")",
	62: "'",
	63: "ç",
	64: "-",
	65: "+",
	66: "/",
	67: "!",
	68: "?",
	69: "$",
	70: "=",
	72: "%",
	73: ";"
}

let theme_keys = Object.keys(themes);

module.exports = {
	/**
	 * 
	 * @param {Discord.Message} msg 
	 * @param {*} m 
	 */
	show: (msg, m) => {
		if (msg.channel.id != "863686392864571392") {
			return msg.reply("<#863686392864571392>");
		}

		//let net = ();
		var ai_opts = null;
		let ai = new brain.recurrent.LSTM({ //new brain.recurrent.LSTM
			activation: "tanh",
			//hiddenLayers: [2,2,2,2,2],
		});

		let titulo = m[1].replaceAll("\_", "_");
		let message = msg.content.replace("dp!criar-artigo ", "").replace(m[1] + " ", "").toLowerCase();

		/*let ai2 = new brain.recurrent.LSTM({
			activation: "tanh"
		});*/

		msg.channel.send("Treinando AI...").then((status) => {
			//prepara a entrada:
			let input = textToWords([message])[0];
			console.log("INPUT", input);
			/*ai2.train(input,{
				iterations: 2000,
				errorThresh: 0.11,
				log: true,
				logPeriod: 1
			})*/

			try {
				let filé = fs.readFileSync(process.cwd() + "/memoria.json");
				ai.fromJSON(JSON.parse(filé));
			} catch (err) {
				console.log(err);

				let textn = [];
				var epoca = texts.length * 200; //32400

				ai.train(texts, {
					iterations: epoca, //2000
					log: (stats) => logFunction(status, stats, epoca),
					logPeriod: 1,
					errorThresh: 0.05,
					//momentum: 0.001,
					learningRate: 0.003
					//timeout: 60000
				});
			}
			var teste = [input, ...texts];
			//ai.toJSON().dataFormatter
			console.log(teste);
			ai.train([input], {
				iterations: 50, //2000
				log: (stats) => logFunction(status, stats, epoca),
				logPeriod: 1,
				errorThresh: 0.5,
				//momentum: 0.001,
				learningRate: 0.003,
				//timeout: 60000
				keepNetworkIntact: true
			});
			let output = input;
			console.log("OUT", output);

			//gera o resto do texto
			for (let y = 0; y < 20; y++) {
				//ai.train({})
				var in_ = output;
				console.log("IN", in_);

				let resultado = textToWords([ai.run(in_, false)])[0]; //mimir.bow(message,dicionario)
				console.log("resultado:", resultado);
				if (resultado.length != 0) {
					if (output[0] != " ") {
						output.push(" ");
					}

					output = [...output, ...resultado];
				}
			}

			//correção ortográfica
			var corr = [];
			for (let z = 0; z < output.length; z++) {
				let o = output[z];
				let o2 = output[z + 1];
				let o3 = output[z + 2];

				if (o == " ") {
					if (o2 == " " || o2 == "." || o2 == "," || o2 == ":" || o2 == ";" || o2 == "!" || o2 == "?") {

					} else {
						corr.push(o);
					}
				} else {
					corr.push(o);
				}
			}
			//output = corr;

			let json = ai.toJSON();

			fs.writeFileSync(process.cwd() + "/memoria.json", JSON.stringify(json, null, 2));

			//post(titulo, output, msg);
			msg.channel.send(output.join(""));
		});
	}
}

function vec_result(res, num_classes) {
	let i = 0,
		vec = [];
	for (i; i < num_classes; i += 1) {
		vec.push(0);
	}
	vec[res] = 1;
	return vec;
}
function maxarg(array) {
	return array.indexOf(Math.max.apply(Math, array));
}

async function logFunction(msg, stats, i) {
	console.log(stats);
	//msg.edit(`Treinando AI...\nInterações: ${stats} / ${i}`);
}

async function post(titulo, output, msg) {
	await Desciclopedia.login().then(() => { });
	await Desciclopedia.edit(`Usuário:DiscordBot/wiki/${titulo}`, output + "\n\n").then(() => {
		msg.channel.send({ embeds: [{ description: `Veja [o artigo](https://desciclopedia.org/wiki/Usuário:DiscordBot/wiki/${titulo}) . Se ficar bom, você pode utiliza-lo.\nVocê também pode adicionar mais paragrafos repetindo o comando!` }] }); //${theme_keys[maxarg(resultado)]}
	});

	delete require.cache[require.resolve(`../core/Desciclopedia.js`)];
}

function textToWords(normie) {
	var r = [];
	for (var x = 0; x < normie.length; x++) {
		//sentença
		var sent = normie[x];
		r[x] = [];
		var ram = "";
		var count = 0;
		for (var y = 0; y < sent.length; y++) {
			if (
				sent[y] == " " ||
				sent[y] == "!" ||
				sent[y] == "?" ||
				sent[y] == "+" ||
				sent[y] == "\"" ||
				sent[y] == "'" ||
				sent[y] == "$" ||
				sent[y] == "(" ||
				sent[y] == ")" ||
				sent[y] == ";" ||
				sent[y] == ":" ||
				sent[y] == "-" ||
				sent[y] == "," ||
				sent[y] == "."
			) {
				if (ram) {
					r[x][count] = ram;
					count++;
				}
				r[x][count] = sent[y];
				count++;
				ram = "";
			} else {
				ram += sent[y];
			}
		}
		if (ram) {
			r[x][count] = ram;
		}
	}

	return r;
}