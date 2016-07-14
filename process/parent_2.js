'use strict'
var child_process = require('child_process');


var child = child_process.spawn('node', [ 'child_2.js' ], {
    // [0, 1, 2] === [process.stdin, process.stdout, process.stderr]
    // 'ipc' - 创建一个IPC通道以在父进程与子进程之间传递 消息/文件标识符。
    // 一个子进程只能有最多一个 IPC stdio 文件标识。 
    // 设置该选项激活 ChildProcess.send() 方法。
    // 如果子进程向此文件标识符写JSON消息，则会触发 ChildProcess.on("message")。
    // 如果子进程是一个nodejs程序，那么IPC通道的存在会激活process.send()和process.on('message')
    stdio: [ 0, 1, 2, 'ipc']
});

// 监听message事件
child.on('message', (msg) => {
    console.log(msg);
});

// 向子进程发送数据
child.send({ parent: "parent_2.js send a message"});