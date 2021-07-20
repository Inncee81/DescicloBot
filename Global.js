const Reddit = require('reddit');

module.exports = {
	client: undefined,
	config: "",
	configData: "",
	spamCount: 1,
	spamUser: undefined,
	spamMessage: "",
	RAM: "",

	prefix: "dp --",
	color: 0xCC0000,
	help: "`help` - mostra a ajuda\n",
	configHelp: "",

	dpLinkExecuted: false,

	//wikiai: manager,

	commands: [
		'help'
	],
	
	settings: {
		welcomeMessages: true,
		dpLink: false,
		dpLinkTime: 90000
	},

	save: async function(t,msg) {
		const fs = require('fs');
		if ( t.charAt( 0 ) == '"' ) {
			fs.writeFile("./configs/" + msg.guild.id + ".json",t.replace("\"","{"),function() {});
		} else {
			fs.writeFile("./configs/" + msg.guild.id + ".json",t,function() {});
		}
	},

	accounts: {
		reddit: new Reddit({
  			username: 'DescicloBot',
  			password: process.env.REDDIT_PASS,
  			appId: process.env.REDDIT_APP_ID,
  			appSecret: process.env.REDDIT_SECRET,
  			userAgent: process.env.USER_AGENT
		}),

		firebaseConfig: {
    		apiKey: process.env.FIREBASE_API_KEY,
    		authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    		projectId: process.env.FIREBASE_PROJECT_ID,
    		storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    		messagingSenderId: process.env.FIREBASE_MS_ID,
    		appId: process.env.FIREBASE_APP_ID
		}
	}
}