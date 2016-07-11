// 获取文件信息   
'use strict'
var fs = require("fs");

fs.stat("oneAddOne.txt", function(error, data) {
    if(error){
        console.log(error);
    } else {
        // 是否是文件
        console.log(`isFile: ${data.isFile()}`);
        // 是否是目录
        console.log(`isDirectory: ${data.isDirectory()}`);
        if(data.isFile()){
            console.log(`size: ${data.size}`);
            console.log(`birth time: ${data.birthtime}`);
            console.log(`modified time: ${data.mtime}`);            
        }
    }
})
 
//  同步函数statSync()