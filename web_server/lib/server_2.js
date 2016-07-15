'use strict'
var http = require("http");
var fs = require('fs');

var main = (argv) => {
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
        root = config.root || ".",
        port = config.port || 80;
    http.createServer((req, res) => {
        var urlInfo = parseURL(root, res.url);
        validataFiles(urlInfo.pathnames, (err, data) => {
            if(err){
                res.writeHead(404);
                res.end(err.message);
            } else {
                res.writeHead(200, {
                    'Content-Type': urlInfo.mime
                });
                outputFiles(pathnames, res);
            }
        })
    }).listen(port);
};

var outputFiles = (pathnames, writer) => {
    (function next(i, len) {
        if(i < len){
            var reader = fs.createReadStream(pathnames[i]);
            reader.pipe(writer, { end: false});
            reader.on('end', () => {
                next(i++, len);
            });
        } else {
            writer.end();
        }
    })(0, pathnames.length);
}

var validataFiles = (pathnames, callback) => {
    (function next(i, len){
        if(i < len){
            fs.stat(pathnames[i], (err, stats) => {
                if(err){
                    callback(err);
                } else if(!stats.isFile()) {
                    callback(new Error());
                } else {
                    next(i++, len);
                }
            })
        } else {
            callback(null, pathnames);
        }
    })(0, pathnames.length);
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

main(process.argv.slice(2));