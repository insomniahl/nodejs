'use strict'
var net = require("net");

var options = {
    port: 80,
    host: 'www.baidu.com'
};

var client = net.connect(options, () => {
    client.write([
        'GET / HTTP/1.1',
        'User-Agent: curl/7.26.0',
        'Host: www.baidu.com',
        'Accept: */*',
        '',
        ''
    ].join('\n'));
});

client.on('data', (data) => {
    console.log(data.toString());
    client.end();
});