'use strict'
var child_process = require("child_process");

var child = child_process.spawn('node', [ 'child_1.js' ]);

// 子进程通过kill发送信号。
// kill在linux系统中，用来终止指定的进程（terminate a process）的运行。
// 格式kill[参数][进程号]
// 不指定型号将发送SIGTERM（15）终止指定进程。如果任务无法终止该程序可用“-KILL” 参数，其发送的信号为SIGKILL(9) ，将强制结束进程
child.kill("SIGTERM", process.pid);



// const spawn = require('child_process').spawn;
// const grep = spawn('grep', ['ssh']);

// grep.on('close', (code, signal) => {
//   console.log(
//     `child process terminated due to receipt of signal ${signal}`);
// });

// // Send SIGHUP to process
// grep.kill('SIGHUP');