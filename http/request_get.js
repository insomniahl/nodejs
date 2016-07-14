'use strict'
var http = require("http");
http.get('http://www.baidu.com/', function (response) {
    var body = [];
	// console.log(response.statusCode);
    // console.log(response.headers);
    response.on('data', function (chunk) {
        // chunk是一堆二进制
        body.push(chunk);
        console.log(chunk);
    });
    response.on('end', function () {
        body = Buffer.concat(body);
        // console.log(body.toString());
    });
});
