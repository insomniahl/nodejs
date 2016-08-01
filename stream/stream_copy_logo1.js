var fs = require('fs');

// 数据来源未填写
var readStream = fs.createReadStream("");
var writeStream = fs.createWriteStream("");

readStream
    .on('data', (chunk) => {
        if(writeStream.write(chunk) === false){
            console.log('still cached');
            readStream.pause();
        }
    })
    .on('end', () => {
        writeStream.end();
    })
    // 数据耗尽事件
    .on('drain', () => {
        console.log('data drains');
        readStream.resume();
    })
