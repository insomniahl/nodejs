'use strict'
var fs = require('fs'),
    path = require('path'),
    http = require('http');

var MIME = {
    '.css': 'text/css',
    '.js': 'application/javascript'
};

var combineFiles = (pathNames, callback) => {
    var output = [];
    (function next(i, len) {
        if(i < len){
            fs.readFile(pathNames[i], (err, data) => {
                if(err){
                    callback(err);
                } else {
                    output.push(data);
                    next(i++, len);
                }
            });
        } else {
            callback(null, Buffer.concat(output));
        }
    })(0, pathNames.length);
}

var main = (argv) => {
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
        root = config.root || ".",
        port = config.port || 80;
    http.createServer((req, res) => {
        var urlInfo = parseUrl(root, req.url);
        combineFiles(urlInfo.pathnames, (err, data) => {
            if(err){
                res.writeHead(500);
                res.end(err.message);
            } else {
                res.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                res.end(data);
            }
        })
    }).listen(port);
}

var parseUrl = (root, url) => {
    var base, pathnames, parts;
    if(url.indexOf("??") === -1){
        url = url.replace('/', "/??");
    }
    parts = url.split('??');
    base = parts[0];
    pathnames = parts[1].split(',').map((value) => {
        return path.join(root, base, value);
    });

    return {
        mime: MIME[path.extname(pathnames[0])] || 'text/plain',
        pathnames: pathnames
    };
}

// main(process.argv.slice(2));
main("config.json");