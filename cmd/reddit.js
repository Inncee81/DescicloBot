const Global = require("../Global");
const Discord = require("discord.js");
const JSDOM = require('jsdom').JSDOM;
const DOMParser = (new JSDOM()).window.DOMParser;

module.exports = {
	show: (msg,m) => {
		var cagando = new Discord.MessageEmbed();
		cagando.setDescription("Carregando...");
		msg.channel.send({embeds:[cagando]}).then( mensa => {
			var res;
			var ansfw = false;

			if (!m[1]) {
				res = '/random';
			} else {
				const porra = m[1];
				res = `/r/${porra}/random`;
			}

			if (msg.channel.id == "311515690827776000") {
				ansfw = true;
				res += "&nsfw=1&include_over_18=on";
			}

			var request = require('request');
			var r = request.get(`https://reddit.com/${res}`, function(err, res2, body) {
				var idtk = "t3_" + r.uri.href.replace(/^(https:\/\/www\.reddit\.com\/r\/).+\/comments\//,"").split("/")[0];

				var r2 = request.get(`https://api.reddit.com/api/info?id=${idtk}&nsfw=1&include_over_18=on`,{ headers: { 'User-Agent': "DescicloBot/1.0.0 (https://DescicloBot.eduappscdg.repl.co)" }}, function(err,res3, body2) {
					var doc = (new DOMParser()).parseFromString(body2,"text/html");
					var json = doc.body.innerHTML;
					var nsfw = false;
					if (JSON.parse(json).data.children[0]) {
						var data = JSON.parse(json).data.children[0].data;
						if (data.thumbnail == "nsfw") {
							nsfw = true;
						}
					}

					console.log(json);

					if (nsfw && !ansfw) {
						mensa.delete();
						msg.channel.send(`<@${msg.author.id}>, tá zuando com a minha cara?`);
						msg.channel.startTyping(2).then(() => {
							msg.channel.send(`Pessoal, o <@${msg.author.id}> tentou mandar pr0n no lugar errado!`);
						});

					} else {
						mensa.edit({embeds:[model(JSON.parse(json),nsfw)]});
					}
				});
			});
		});
	}
}

function model(json,nsfw) {
	var data;

	if (json.data.children[0]) {
		data = json.data.children[0].data;
	}  else {
		data = {
			title: "Ouch!",
			selftext: "O subreddit não foi encontrado ou está privado.",
			subreddit: "404",
			permalink: "https://xvideos.com",
			author: "Uma vadia qualquer",
			ups: -2,
			downs: 430239
		}
	}
	var ico = "https://www.redditstatic.com/desktop2x/img/favicon/apple-icon-180x180.png";
	var r = new Discord.MessageEmbed();
	r.setThumbnail(ico);
	r.setAuthor(`r/${data.subreddit}`);
	r.setTitle(data.title);
	r.setURL(`https://reddit.com${data.permalink}`);
	//caso tenha texto
	if (data.selftext) {
		r.setDescription(data.selftext);
	}
	//caso contenha imagem
	if (data.url_overridden_by_dest) {
		if (data.url_overridden_by_dest.toLowerCase().endsWith(".png")
		 || data.url_overridden_by_dest.toLowerCase().endsWith(".jpg")
		 || data.url_overridden_by_dest.toLowerCase().endsWith(".jpeg")
		 || data.url_overridden_by_dest.toLowerCase().endsWith(".gif")
		 || data.url_overridden_by_dest.toLowerCase().endsWith(".bin")) {
			if (!nsfw) {
				r.setImage(data.url_overridden_by_dest);
			} else {
				r.setImage(data.url_overridden_by_dest.replace("preview.redd.it","i.redd.it"));
			}
		} else {
			r.setDescription(`${data.selftext}\n\n[(url linkado)](${data.url_overridden_by_dest})`);
		}
	}
	r.setFooter(`${data.author} ─ 👍 ${data.ups} | 👎 ${data.downs}`, ico);
	return r;
}