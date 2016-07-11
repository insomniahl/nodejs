'use strict'
var fs = require("fs");

var ws1 = fs.createWriteStream("output_1.txt", "utf-8");
ws1.write("使用stream写入文本数据。。。\n");
ws1.write("END");
ws1.end();

var ws2 = fs.createWriteStream("output_2.txt", "utf-8");
ws2.write(new Buffer("使用stream写入二进制数据。。。\n", "utf-8"));
ws2.write(new Buffer("END", "UTF-8"));
ws2.end();