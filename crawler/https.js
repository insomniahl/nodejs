var https = require("https");
var fs = require("fs");

var options = {
    key: fs.readFileSync("ssh_key.pem"),
    cert: fs.readFileSync("ssh_cert.pem")
};

https.createServer(options, (req, res) => {
    res.writeHead(200);
    res.end("Hello Imooc");
}).listen(8090);

// 创建一个https请求。但无法执行，因为'ssh_key.pem'没有