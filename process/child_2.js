'use strict'

// 由父进程spawn配置文件stdio['ipc']激活process.on('message')和process.send()方法
process.on('message', (msg) => {
    msg.child = "child_2.js send a message";
    // 向父进程发送信息，触发message事件
    process.send(msg);
})