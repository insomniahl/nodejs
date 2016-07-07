var EventEmitter = require('events').EventEmitter;
var life = new EventEmitter();

function water(who){
    console.log(`给 ${who} 倒水`);
}

// 增加监听life.addListener(eventName, listener)
// 默认最大请求数为10，可通过setMaxListeners()方法改变最大请求数
life.on('求安慰', water);
life.on('求安慰', function(who){
    console.log(`给 ${who} 洗衣`);
});
life.on('求安慰', function(who){
    console.log(`给 ${who} 做饭`);
});

// 不能取消回调函数是匿名函数的监听
life.removeListener('求安慰',water);
// 清除所有事件
// life.removeAllListeners();

// 通过emit来触发事件
// 返回布尔值，是否被监听
var hasListener = life.emit('求安慰', '汉子');
var hasLoveListener = life.emit('求溺爱', '妹纸');

console.log(life.listeners('求安慰'));
console.log(life.listeners('求安慰').length);

// 第一个参数为实例名称，第二个参数为事件名字
console.log(EventEmitter.listenerCount(life, '求安慰'));

console.log(hasListener);
console.log(hasLoveListener);
