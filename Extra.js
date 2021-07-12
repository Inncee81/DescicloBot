const Global = require('./Global');

module.exports = {
	verifySpam: async function(msg) {
		console.log(`canal: ${msg.channel.id}\nlink: ${msg.content.toLowerCase().includes("http")}`);

		if (msg.channel.id === "311260823001628674" || (msg.channel.id === "311515690827776000" && (msg.content.toLowerCase().includes("http") || msg.content === ""))
		 ) { } else {
			if (Global.spamMessage === msg.content && Global.spamUser === msg.author.id) {
				Global.spamCount++;
			} else {
				Global.spamCount = 1;
			}
			Global.spamMessage = msg.content;
			Global.spamUser = msg.author.id;

			console.log(msg.author.id + ": " + msg.content + "\n\ncountagem de spam: " + Global.spamCount);
		}

		if (Global.spamCount == 5) {
			msg.member.roles.add("543499663806824497").catch(console.error);
			msg.member.roles.remove("311359153807294465").catch(console.error);

			var link = [
				"https://www.youtube.com/watch?v=5KBoeeb4ies",
				"https://www.youtube.com/watch?v=rGgZhIe8BbY"
			];

			msg.channel.send("<@!" + msg.author.id + `>, até mais!\n\n${link[Math.floor(Math.random() * (link.length))]}`)
		}
	},

	checkMute: function(msg) {
		let muted = msg.guild.roles.cache.get('543499663806824497').members.map(m=>m.user.tag);
		let colosseum = Global.client.channels.cache.get("815406995250479164");

		if (muted.length == 0) {
			colosseum.permissionOverwrites.set([{
				id: "311359153807294465",
				deny: [
					"SEND_MESSAGES"
				]
			}, {
				id: "543499663806824497",
				deny: [
					"SEND_MESSAGES"
				]
			}, {
				id: msg.guild.roles.everyone.id,
				deny: [
					"VIEW_CHANNEL"
				]
			}],"Apedrejamento fechado devido a nenhum usuário castigado.");
		} else {
			colosseum.permissionOverwrites.set([{
				id: "311359153807294465",
				allow: [
					"SEND_MESSAGES"
				]
			}, {
				id: "543499663806824497",
				deny: [
					"SEND_MESSAGES"
				]
			}, {
				id: msg.guild.roles.everyone.id,
				deny: [
					"VIEW_CHANNEL"
				]
			}],"Apedrejamento fechado devido a nenhum usuário castigado.");
		}
	}
}