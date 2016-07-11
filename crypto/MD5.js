'use strict'
const crypto = require("crypto");
// 若要计算SHA1，只需把'md5'改成'sha1'，还可使用'sha256'、'sha512'
const hash =  crypto.createHash("md5");

// 可多次调用update
// update默认字符串编码为utf-8,也可以传入Buffer
hash.update("hello world");
hash.update("hello nodejs");

// 计算传入的所有数据的hash摘要值。hash.digest([encoding])。encoding可以是'hex'、'binary'或者'base64'，如果没有指定，会返回一个buffer对象。
console.log(hash.digest('hex'));
//  hash对象在调用digest()之后就不再可用了。