var http = require("http");
var fs = require("fs");

http.createServer((req, res) => {
    // fs.readFile('logo.png', (err, data) => {
    //     if(err){
    //         res.end("file not exist");
    //     }
    //     res.writeHeader(200, {'Content-Type': 'text/html'})
    //     res.end(data);
    // })

    fs.createReadStream("logo.png").pipe(res);
}).listen(8080)