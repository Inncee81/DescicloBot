var request = require('request').defaults({ jar: true });
var Global = require("../Global");

var conta = Global.accounts.desciclopedia;

var DescicloApi = {
	apiUrl: 'https://desciclopedia.org/api.php',

	login: () => {
		return new Promise(async (resolve, reject) => {
			var params = {
				action: 'query',
				meta: 'tokens',
				type: 'login',
				format: 'json'
			};
			var status = false;

			await request.get({ url: DescicloApi.apiUrl, qs: params }, async function (error, res, body) {
				var data;
				if (error) {
					console.log(error);
					reject();
					return;
				}
				data = JSON.parse(body);
				console.log("login",data);
				status = await DescicloApi.loginRequest(data.query.tokens.logintoken);
				resolve();
			});

			return status;
		});
	},

	loginRequest: (loginToken) => {
		console.log(loginToken);
		return new Promise((resolve, reject) => {
			var params = {
				action: 'clientlogin',
				username: process.env.DESCICLOPEDIA_USER,
				password: process.env.DESCICLOPEDIA_PASS,
				logintoken: loginToken,
				loginreturnurl: "https://google.com",
				format: 'json'
			};
			var status = false;

			request.post({ url: DescicloApi.apiUrl, form: params }, (error, res, body) => {
				if (error) {
					console.log(error);
					reject();
					return;
				}
				console.log("clogin",body);
				status = true;
				resolve();
			});
			return status;
		});
	},

	edit: (article, text) => {
		return new Promise(async (resolve, reject) => {
			var params_2 = {
				action: "query",
				meta: "tokens",
				type: "csrf",
				format: "json"
			};
			var status = false;

			await request.get({ url: DescicloApi.apiUrl, qs: params_2 }, async function (error, res, body) {
				if (error) {
					console.log(error);
					reject();
					return;
				}

				var data = JSON.parse(body);
				console.log("edit",data);
				status = await DescicloApi.editRequest(data.query.tokens.csrftoken, article, text);
				resolve();
			});

			return status;
		});
	},

	editRequest: (csrf_token, article, text) => {
		return new Promise((resolve, reject) => {
			console.log(csrf_token);
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
				console.log("editr", body);
				resolve();
			});

			return status;
		});
	}
};

module.exports = DescicloApi;