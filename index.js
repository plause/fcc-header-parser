var http = require('http');

function defaultHandler(req, res) {
	res.statusCode = 404;
	res.end();
}

var handlers = {};

http.createServer(function (req, res) {
	(handlers[req.url] || defaultHandler)(req, res);
}).listen(process.env.PORT || 5000);
