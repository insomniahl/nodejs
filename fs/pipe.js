'use strict'
var fs = require("fs");

// 一个Readable流和一个Writable流串起来后，所有的数据自动从Readable流进入Writable流，这种操作叫pipe。

var rs = fs.createReadStream("output_1.txt", "utf-8");
var ws = fs.createWriteStream("copy_output_1.txt", "utf-8");

rs.pipe(ws);

// 默认情况下，当Readable流的数据读取完毕，end事件触发后，将自动关闭Writable流。如果我们不希望自动关闭Writable流，需要传入参数：
// readable.pipe(writable, { end: false });