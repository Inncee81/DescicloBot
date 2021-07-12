const request = require('request');

module.exports = {
	edit: function(article, text, callback) {
		var artigourl = encodeURIComponent(replaceAll(article," ", "_"));
		request.post(`https://desciclopedia.org/index.php?action=submit&summary=DescicloBot&title=${artigourl}&wpEditToken=${process.env.DESCICLOPEDIA_TOKEN_EDIT}&text=${encodeURIComponent(text)}`,{ headers: { 'User-Agent': "DescicloBot/1.0.0 (https://DescicloBot.eduappscdg.repl.co)" }}, function(err,res, body) {
			(callback)(err,res,body);
		});
	}
}

function escapeRegExp(string) {
  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'); // $& means the whole matched string
}

function replaceAll(str, match, replacement){
   return str.replace(new RegExp(escapeRegExp(match), 'g'), ()=>replacement);
}