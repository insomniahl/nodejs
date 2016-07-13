'use strict'
var fs = require('fs');

function copy(src, dst) {
    // 读取数据必须使用同步来实现，异步数据为undefined
    fs.writeFile(dst, fs.readFileSync(src));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));

// 输入node copy.js output_1.txt copy_file.txt