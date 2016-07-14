'use strict'
const http = require('http');

const hostname = '127.0.0.1';
const port = 1337;

http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('Hello Node.js\n');

  // 只做学习使用，在该js中无作用
  req.on('data', function(chunk){
    res.write(chunk);
  });

  req.on('end', function(){
    res.end("hello world");
  });

}).listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});