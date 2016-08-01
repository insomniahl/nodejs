var fs = require("fs");

var readStream = fs.createReadStream("stream_copy_logo.js");
var n = 0;

readStream
    .on('data', (chunk) => {
        n++;
        console.log("data emits");
        console.log(Buffer.isBuffer(chunk));
        // console.log(chunk.toString('utf8'));
        // 暂停读取数据流
        readStream.pause();
        console.log("data pause");
        setTimeout(() => {
            console.log('data pause end');
            // 继续读取数据流
            readStream.resume()
        }, 3000)
    })
    .on('readable', () => {
        console.log("data readable");
    })
    .on('end', () => {
        console.log(n);
        console.log('data ends');
    })
    .on('close', () => {
        console.log('data close');
    })
    .on('error', () => {
        console.log('data error');
    })