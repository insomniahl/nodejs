'use strict'
// 用随机数“增强”的哈希算法
const crypto = require("crypto");

// 'secrit-key'是自己设置的一个私钥，可以随意更改
const hmac = crypto.createHmac('sha256', 'secret-key');
// 通过提供的数据更新hmac对象。因为它是流式数据，所以可以使用新数据调用很多次。
hmac.update('hello world');
hmac.update('heelo nodejs');

// 计算传入的所有数据的hmac摘要值。hmac.digest([encoding])。encoding可以是'hex'、'binary'或者'base64'，如果没有指定，会返回一个buffer对象。
console.log(hmac.digest('hex'));
//  hmac对象在调用digest()之后就不再可用了。