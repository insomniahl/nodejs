'use strict'
var http = require("http");

var server = http.createServer(function(req, res) {
    console.log(`${req.method} : ${req.url}`);
    // 将HTTP响应200写入response, 同时设置Content-Type: text/html:
    res.writeHead(200, {'Content-Type': 'text/html'});
    // 将HTTP响应的HTML内容写入response:
    res.end("<h1>hello world</h1>");
});

// 让服务器监听8080端口:也可以加上第二个参数URL地址，以及回调函数
server.listen("8080");

console.log("Server is running at http://127.0.0.1:8080");

//server.listen("8080", "127.0.0.1", () => {
    // console.log("Server is running at http://127.0.0.1:8080");
// });