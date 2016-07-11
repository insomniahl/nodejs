'use strict'
const crypto = require("crypto");

// 对称加密算法，加解密都用同一个密钥
// 加密
// cipher.update(data, [input_encoding], [output_encoding])
function aesEncrypto(data, key) {
    const cipher = crypto.createCipher('aes192', key);
    var crypted = cipher.update(data, 'utf-8', 'hex');
    crypted += cipher.final('hex');
    return crypted;
}

// 解密
// decipher.update(data, [input_encoding], [output_encoding])
function aesDecrypt(data, key) {
    const decipher = crypto.createDecipher('aes192', key);
    var decrypted = decipher.update(data, 'hex', 'utf-8');
    decrypted += decipher.final('utf-8');
    return decrypted;
}

var data = "Hello, this is a secret message!";
var key = "Password";
var encrypted = aesEncrypto(data, key);
var decrypted = aesDecrypt(encrypted, key);

console.log(`Plain text: ${data}`);
console.log(`Encrypted text: ${encrypted}`);
console.log(`Decrypted text: ${decrypted}`);

// AES有很多不同的算法，如aes192，aes-128-ecb，aes-256-cbc等
// AES除了密钥外还可以指定IV（Initial Vector）
// 不同的系统只要IV不同，用相同的密钥加密相同的数据得到的加密结果也是不同的。