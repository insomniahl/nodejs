'use strict'
var fs = require("fs");

// 读取纯文本
fs.readFile("oneAddOne.txt", 'utf-8', function(error, data){
    if(error){
        console.log(error);
    } else {
        console.log(data);
    }
})

// 读取二进制
fs.readFile('win10.jpg', function(error, data){
    if(error){
        console.log(error);
    } else {
        console.log(data);
        console.log(`${data.length} bytes`);        
    }
})

// 若返回值是一个二进制  Buffer对象(一个包含零个或任意个字节的数组，与数组不一样)
// Buffer -> string
// var txt = data.toString('utf-8');
// var buf = new Buffer(txt, 'utf-8');

// 若要同步读文件,无回调函数
// try{
    // var data = readFileSync('oneAddOne.txt', 'utf-8');
    // Deal With data
// } catch(error){
    // Deal With error
// }

//写文件用writeFile()