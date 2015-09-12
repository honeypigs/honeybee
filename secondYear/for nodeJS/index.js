var server = require("./server");
var router = require("./router");
var requestHnadlers = require("./requestHandlers");

var handle = {};
	handle["/"] = requestHnadlers.start;
	handle["/start"] = requestHnadlers.start;
	handle["/upload"] = requestHnadlers.upload;
	server.start(router.route,handle);
