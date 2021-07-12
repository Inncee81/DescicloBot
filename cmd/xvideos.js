const XVideos = require('@rodrigogs/xvideos');
const Global = require('../Global');
const Discord = require('discord.js');
const XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
const JSDOM = require('jsdom').JSDOM;
const DOMParser = (new JSDOM()).window.DOMParser;
const https = require('follow-redirects').https;
const xv = require('xvideos');

module.exports = {
	show: async function(msg,m) {
		if (msg.channel.nsfw) {
			let carregador = new Discord.MessageEmbed();
			carregador.setDescription("Carregando...");

			console.log(m[1]);


			if(m[1] == "q" || m[1] == "query") {
				var pesquisa = "";

				for (var x = 2; x < m.length; x++) {
					pesquisa += `${m[x]}+`;
				}

				console.log(pesquisa);

				msg.channel.send({embeds: carregador}).then(function(msgbot) {
					console.log("carregando");
					getVideosList2(pesquisa.slice(0,-1)).then((videos) => {
						console.log("then");

						if (videos.length < 1) {
							carregador.setDescription("__**404**__, se fudeu!");
							msgbot.edit({embeds: carregador});
							return false;
						}

						var random = Math.floor(Math.random() * ((videos.length - 1) - 0)) + 0;

						getDetails(videos[random].link).then((details) => {
							console.log("url passado");
							msgbot.edit({embeds: modelo(details)}).catch(console.error);
						});
					});
				});
			} else {
				msg.channel.send({embeds: carregador}).then(async function(msgbot) {
					const fresh = await XVideos.videos.fresh({ page: 1 });
					getDetails(fresh.videos[0].url).then((details) => {
						msgbot.edit({embeds:modelo(details)}).catch(console.error);
					});
				});
			}
		} else {
			msg.channel.send("Esse comando não é para criancinhas como você, **vai lá brincar de pega-pega ~~no meu pau~~!**")
		}
	},

	query: async function (msg, m) {
		if (msg.channel.nsfw) {
			let carregador = new Discord.MessageEmbed();
			carregador.setDescription("Carregando...");

			console.log(m[1]);

			var pesquisa = "";

			for (var x = 1; x < m.length; x++) {
				pesquisa += `${m[x]}+`;
			}

			console.log(pesquisa);

			msg.channel.send({embeds:[carregador]}).then(function(msgbot) {
				console.log("carregando");
				getVideosList2(pesquisa.slice(0,-1)).then((videos) => {
					console.log("then");

					if (videos.length < 1) {
						carregador.setDescription("__**404**__, se fudeu!");
						msgbot.edit({embeds:[carregador]});
						return false;
					}

						var random = Math.floor(Math.random() * ((videos.length - 1) - 0)) + 0;

					getDetails(videos[random].link).then((details) => {
						console.log("url passado")
						msgbot.edit({embeds:[modelo(details)]}).catch(console.error);
					});
				});
			});
		} else {
			msg.channel.send("Esse comando não é para criancinhas como você, **vai lá brincar de pega-pega ~~no meu pau~~!**");
		}
	}
}

function modelo(detail) {
	let r = new Discord.MessageEmbed();
	let ico = "https://xvideos.com/apple-touch-icon.png";

	r.setAuthor(detail.author.name,detail.author.icon);
	r.setTitle(detail.title);
	r.setThumbnail(ico);
	r.setImage(detail.image);
	r.setURL(detail.video);
	r.addField("tags",detail.getAllTags());
	r.setFooter(`${detail.duration} ─ 👍 ${detail.likes} | 👎 ${detail.dislikes}`, ico);

	return r;
}

function getDetails(url) {
	let obj = {
		title: "Titulo Deconhecido",
		image: "https://images.uncyc.org/pt/b/b0/Erro404.gif",
		video: "",
		static_url: "",
		tags: [],
		duration: "00:00",
		views: "0",
		likes: "-5",
		dislikes: "321",
		author: {
			name: "O Nada",
			icon: "https://cdn.discordapp.com/avatars/242721083629764608/ca63a7f6769349cfec6cecc452e5d3e9.png?size=128"
		},

		getAllTags: function() {
			var r = "";
			if (!obj.tags[0]) {
				return "`nada`";
			} else {
				for (var x = 0; x < obj.tags.length; x++) {
					r += `${obj.tags[x]}`;
					if (obj.tags[x+1]) {
						r += " • ";
					}
				}
				
				return r;
			}
		}		
	}
	console.log("url atual",url);

	return new Promise(function(resolve,reject) {
		console.log("prometido");
		//checa a pagina do xvideos
		var xmlhttp = new XMLHttpRequest();

		xmlhttp.open("GET",url,true);
		xmlhttp.setRequestHeader("Access-Control-Allow-Origin","*");
		xmlhttp.setRequestHeader("Origin","*");
		xmlhttp.onload = function(){
        	if(xmlhttp.status == 200 && xmlhttp.readyState == 4){
				console.log("carregado")
				//pega os valores da pagina recém caregada
				let parser = new DOMParser();
				let doc = parser.parseFromString(xmlhttp.responseText, "text/html");

				//pega os valores (Valois)
				let tempo = doc.querySelector("h2[class=\"page-title\"] span[class=\"duration\"]").innerHTML;
				let autor_link = "https://xvideos.com/" + doc.querySelector("div.video-metadata ul li a.uploader-tag").href;
				let autor_nome = doc.querySelector("div.video-metadata ul li a.uploader-tag span.name").innerHTML;
				let likes = doc.querySelector("a.vote-action-good span.rating-inbtn").innerHTML;
				let dislikes = doc.querySelector("a.vote-action-bad span.rating-inbtn").innerHTML;
				let vurl = xmlhttp.responseText.split("\"");
				let thumb = doc.querySelector("#html5video img").src;
				let pretags = doc.querySelectorAll("div.video-metadata ul li a.btn-default");
				var tags = [];
				let video = url;
				var h2 = doc.querySelector("h2[class=\"page-title\"]");

				for (var x = 0; x < vurl.length;x++) {
					if (vurl[x].startsWith("blob:http")) {
						console.log(vurl[x]);
					}
				}

				//pega o titulo
				for(var i=0;i<h2.childNodes.length;i++){
  					if(h2.childNodes[i].nodeType!=3)//not TEXT_NODE
    					h2.removeChild(h2.childNodes[i--]);
				}
				let titulo = doc.querySelector("h2[class=\"page-title\"]").innerHTML;

				var tag_num = 0;
				//pega as tags
				for (var x = 3; x < pretags.length; x++) {
					console.log(pretags[x].innerHTML);
					tags[tag_num] = `[\`${pretags[x].innerHTML}\`](https://xvideos.com${pretags[x].href})`;
					
					tag_num++;
					if (x == 7) {
						x = pretags.length;
					}
				}

				//seta os valores
				obj.title = titulo;
				obj.duration = tempo;
				obj.author.name = autor_nome;
				obj.likes = likes;
				obj.dislikes = dislikes;
				obj.image = thumb;
				obj.video = video;
				obj.tags = tags;
				obj.static_url = url;

				resolve(obj);
			
        	}
    	};
		xmlhttp.onreadystatechange = function() {
			console.log("READY_STATE:",xmlhttp.readyState);
			console.log("STATUS:",xmlhttp.status);
		}
		xmlhttp.send();
	});
}

function getVideosList(query) {
	console.log("getVideosList");
	var videos = [];

	return new Promise((resolve, reject) => {
		console.log("Promessa sendo cumprida");

		//checa a pagina do xvideos
		var xmlhttp = new XMLHttpRequest();
		xmlhttp.onreadystatechange = function(){
        	if((xmlhttp.status === 200 || xmlhttp.status === 0) && xmlhttp.readyState === 4){
				console.log("done!");

				//pega os valores da pagina recém caregada
				let parser = new DOMParser();
				let doc = parser.parseFromString(xmlhttp.responseText, "text/html");
				let divs = doc.querySelectorAll("div.thumb-block.tbm-init-ok");
				
				console.log(xmlhttp.responseText);

				//procura por links e titulos
				for (var x  = 0; x < divs.length; x++) {
					let link = divs[x].querySelector("p a");

					console.log(link.href);

					videos[x] = {
						link: link.href,
						title: link.title
					}
				}

				resolve(videos);
			}
		}
		xmlhttp.onload = function() {
			console.log(xmlhttp.status);
			console.log(xmlhttp.readyState);
		}
		xmlhttp.open("GET",query,true);
		xmlhttp.setRequestHeader("Access-Control-Allow-Origin","*");
		xmlhttp.setRequestHeader("Origin","*");
		xmlhttp.send();
	});
}

/**
 * funcional
 */
function getVideosList2(query) {
	console.log("getVideosList2");
	var videos = [];
	var html = "";
	var opt = {
		hostname: "xvideos.com",
  		port: 443,
  		path: '/?k=' + query,
		method: "GET"
	}

	return new Promise(function(resolve, reject) {
    	var req = https.request(opt, (res) => {
  			console.log('statusCode:', res.statusCode);
  			console.log('headers:', res.headers);
  			console.log('URL:', res.url);
        	
			res.on('data', function (data) {
				console.log("done");
				html += data.toString('utf8');
			}).on('end', function() {

				//pega os valores da pagina recém caregada
				let parser = new DOMParser();
				let doc = parser.parseFromString(html, "text/html");
				let divs = doc.querySelectorAll("div.thumb-block");

				console.log(divs.length)
				//procura por links e titulos
				for (var x  = 0; x < divs.length; x++) {
					let link = divs[x].querySelector("p a");


					console.log("https://xvideos.com" +link.href);

					videos[x] = {
						link: "https://www.xvideos.com" + link.href,
						title: link.title
					}
				}

				resolve(videos);
    	    });
    	});
	    
		req.on('error', function (e) {
    	    console.error(e);
			reject();
	    });
    	
		req.end(); // correct place
	});
}

function getVideosList3(query) {
	var videos = [];

	return new Promise(function(resolve, reject) {
		xv.search({k: query}, function(err, results) {
  			console.log(err, results);
			  resolve(videos);
		});
	});
}