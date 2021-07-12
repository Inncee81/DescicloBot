const Global = require("../Global.js");
var request = require( 'request' ).defaults( { jar: true } );

var conta = Global.accounts.desciclopedia;

var DescicloApi = {
	apiUrl: 'https://desciclopedia.org/api.php',

	login: () => {
		return new Promise((resolve,reject) => {
			var params = {
				action: 'query',
				meta: 'tokens',
				type: 'login',
				format: 'json'
			};
			var status = false;

			request.get( { url: DescicloApi.apiUrl, qs: params }, async function ( error, res, body ) {
				var data;
				if ( error ) {
					console.log(error);
					reject();
					return;
				}
				data = JSON.parse( body );
				console.log(data);
				status = await DescicloApi.loginRequest(data.query.tokens.logintoken);
				resolve();
			});

			return status;
		});
	},

	loginRequest: (loginToken) => {
		return new Promise((resolve,reject) => {
			var params = {
				action: 'clientlogin',
				username: process.env.DESCICLOPEDIA_USER,
				password: process.env.DESCICLOPEDIA_PASS,
				logintoken: loginToken,
				loginreturnurl: "https://google.com",
				format: 'json'
			};
			var status = false;

			request.post( { url: DescicloApi.apiUrl, form: params }, ( error, res, body ) => {
				if ( error ) {
					console.log(error);
					reject();
					return;
				}
				console.log(body);
				status = true;
				resolve();
				return status;
			});
		});
	},

	edit: (article, text) => {
		return new Promise((resolve,reject) => {
	    	var params_2 = {
    	    	action: "query",
    		    meta: "tokens",
	        	format: "json"
	    	};
			var status = false;

		    request.get({ url: DescicloApi.apiUrl, qs: params_2 }, async function(error, res, body) {
    		    if (error) {
					console.log(error);
					reject();
        		    return;
		        }

    		    var data = JSON.parse(body);
				console.log(data);
        		status = await DescicloApi.editRequest(data.query.tokens.csrftoken,article,text);
				resolve();
    		});

			return status;
		});
	},

	editRequest: (csrf_token,article,text) => {
		return new Promise((resolve,reject) => {
			var params_3 = {
        		action: "edit",
    		    title: article,
		        appendtext: text,
				summary: "DescicloBot (Discord)",
				minor: 1,
    		    format: "json",
				bot: 1,
        		token: csrf_token
		    };
			var status = false;

    		request.post({ url: DescicloApi.apiUrl, form: params_3 }, function (error, res, body) {
	        	if (error) {
					console.log(error);
					reject();
    	        	return;
	        	}

				status = true;
        		console.log(body);
				resolve();
    		});

			return status;
		});
	}
}

module.exports = {
	show: async function(msg,m) {
		await DescicloApi.login().then();
		await DescicloApi.edit("Usuário:DiscordBot/sandbox", "Shuppa minha rolla!").then(() => {
			msg.channel.send("dá uma olhada em https://desciclopedia.org/wiki/Usuário:DiscordBot/sandbox.");
		}, () => {
			msg.channel.send("toma noku, não deu!");
		});
	}
}