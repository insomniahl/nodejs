'use strict'
const crypto = require('crypto');

// 创建迪菲－赫尔曼密钥交换
// 创建一个迪菲－赫尔曼密钥交换对象，并根据给定的位长度生成一个质数。所用的生成器是s。
var ming = crypto.createDiffieHellman(512);
// 生成迪菲－赫尔曼算法的公钥和私钥，并根据指明的编码方式返回公钥。`默认返回buffer对象
var ming_keys = ming.generateKeys();

// 根据指明的编码格式返回迪菲－赫尔曼素数，其中编码方式可以是'binary', 'hex' 或 'base64'。如果没有指明编码方式，则返回一个buffer对象。
var prime = ming.getPrime();
// 获取生成器编号
var generator = ming.getGenerator();

console.log(`Prime: ${prime.toString('hex')}`);
console.log(`Generator: ${generator.toString('hex')}`);

// 根据给定的素数创建一个迪菲－赫尔曼密钥交换对象。 所用的生成器是2。编码方式可以是'binary', 'hex'或 'base64'。如果没有指明编码方式，则默认是一个buffer对象。
var hong = crypto.createDiffieHellman(prime, generator);
var hone_keys = hong.generateKeys();

// diffieHellman.computeSecret(other_public_key, [input_encoding], [output_encoding])
// 以other_public_key作为第三方公钥来计算共享秘密，并返回这个共享秘密。
// 参数中的密钥会以input_encoding编码方式来解读，而共享密钥则会用output_encoding进行编码。
// 编码方式可以是'binary', 'hex'或 'base64'。
// 如果没有提供输入的编码方式，则默认为一个buffer对象。
var ming_secret = ming.computeSecret(hone_keys);
var hong_secret = hong.computeSecret(ming_keys);

console.log(`Secret of xiao ming: ${ming_secret.toString('hex')}`);
console.log(`Secret of xiao hong: ${hong_secret.toString('hex')}`);