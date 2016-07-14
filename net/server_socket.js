'use strict'
var net = require("net");

var server = net.createServer((socket) => {
    socket.on("data", (data) => {
        socket.write([
            'HTTP/1.1 200 OK',
            'Content-Type: text/plain',
            'Content-Length: 12',
            '',
            'Hello Socket'
        ].join('\n'));
    });
}).listen(10086);