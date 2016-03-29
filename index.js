var http = require('http');

function whoamiApiHandler(req, res) {
	var languages = req.headers['accept-language'];
	var comma = languages.indexOf(',');
	var language = comma === -1 ? languages : languages.substring(0, comma);

	var ua = req.headers['user-agent'];
	var left = ua.indexOf('(');
	var right = ua.indexOf(')');
	var software = ua.substring(left + 1, right);

	res.setHeader('Content-Type', 'application/json; charset=utf-8');
	res.end(JSON.stringify({
		'ipaddress': req.socket.remoteAddress,
		'language': language,
		'software': software
	}));
}

function defaultHandler(req, res) {
	res.statusCode = 404;
	res.end();
}

var handlers = {
	'/api/whoami/': whoamiApiHandler
};

http.createServer(function (req, res) {
	(handlers[req.url] || defaultHandler)(req, res);
}).listen(process.env.PORT || 5000);
