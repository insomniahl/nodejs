'use strict'
var http = require("http");
var fs = require("fs");
var url = require("url");
var path = require("path");

// 从命令行参数获取root目录，默认是当前目录:
// process.argv 一个包含命令行参数的数组。第一个元素会是 'node'， 第二个元素将是 .Js 文件的名称。接下来的元素依次是命令行传入的参数。 
// 比如命令行输入$node http.js one two
// 那么process.argv[2]就是one，process.argv[3] == two
var root = path.resolve(process.argv[2] || '.');

console.log(`Static root dir: ${root}`);

var server = http.createServer(function(req, res){
    // 获得URL的path，类似 '/css/bootstrap.css':
    var pathName = url.parse(req.url).pathname;
    // 获得URL的localhost:
    var location = url.parse(req.url).href;    
    // 获得对应的本地文件路径，类似 '/srv/www/css/bootstrap.css':
    var filePath = path.join(root, pathName);
     // 获取文件状态:
    fs.stat(filePath, function(error, stats) {
        if(!error && stats.isFile()){
            console.log(`200 ${req.url}`);
            res.writeHead(200);
             // 将文件流导向response:
            fs.createReadStream(filePath).pipe(res);
        } else if (!err && !stats.isFile()) {
            fs.readdir(filePath, function(err, files){
                if (err) {
                    console.log("no files found in this dir!");
                } else {
                    console.log("list all files and dirs!")
                    var list = '<!DOCTYPE html><html lang="en"><head><meta charset="UTF-8" /><title>Document</title></head><body>';
                    for (var file of files) {
                        var filepath = path.join(location, file);
                        list += `<a href="${filePath}">${file}</a><br/>`;
                    }
                    list += '</body></html>';
                    res.end(list);
                }
            });
        } else {
            console.log(`404 ${req.url}`);
            res.writeHead(404);
            res.end('404 Not Found');
        }
    })
}).listen(8080);

console.log("Server is running at http://127.0.0.1:8080/");

// 格式 node <.js> <path> 
// 输入node file_server.js /Users/insomniahl/Project/nodejs/http