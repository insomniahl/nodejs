'use strict'
var fs = require('fs');

function copy(src, dst) {
    // pipe方法把两个数据流连接了起来
    fs.createReadStream(src).pipe(fs.createWriteStream(dst));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));

// 输入node copyStream.js output_1.txt copy_stream.txt