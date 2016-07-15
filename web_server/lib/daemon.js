'use strict'
var child = require('child_process');

var worker;

function spawn(server, config) {
    worker = child.spawn('node', [ server, config ]);
    worker.on('exit', (code) => {
        if(code !== 0){
            spawn(server, config);
        }
    })
}

function main(argv) {
    spawn('server_3.js', argv[0]);
    process.on('SIGTERM', () => {
        worker.kill();
        process.exit(0);
    })
}

main(process.argv.slice(2));