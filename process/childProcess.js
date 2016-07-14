'use strict'
var child_process = require("child_process");

// 第一个参数是执行文件路径，可以是执行文件的相对或绝对路径，也可以是根据PATH环境变量能找到的执行文件名。(即调用一个文件)
// 第二个参数中，数组中的每个成员都按顺序对应一个命令行参数。参数为要创建子进程的js文件
// 第三个参数可选，用于配置子进程的执行环境与行为。
var child = child_process.spawn('node', ['consolelog.js']);

child.stdout.on('data', (data) => {
    console.log(`stdout: ${data}`);
})

child.stderr.on('data', (data) => {
    console.log(`stderr: ${data}`);
})

child.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
})