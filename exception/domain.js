'use strict'
var http = require("http");
var domain = require("domain");

var async = (request, callback) => {
    // Do something.
    asyncA(request, (data) => {
        // Do something.
        asyncB(request, (data) => {
            // Do something.
            asyncC(request, (data) => {
                // Do something.
                callback(data);
            });
        });
    });
}

http.createServer((req, res) => {
    var d = domain.create();
    d.on('error', () => {
        res.writeHead(500);
        res.end();
    });

    d.run(() => {
        async(req, (data) => {
            res.writeHead(200);
            res.end(data);
        })
    });
});