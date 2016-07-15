function main(argv) {
    var config = JSON.parse(fs.readFileSync(argv[0], 'utf-8')),
        root = config.root || '.',
        port = config.port || 80,
        server;

    server = http.createServer(function (request, response) {
        ...
    }).listen(port);

    process.on('SIGTERM', function () {
        server.close(function () {
            process.exit(0);
        });
    });
}