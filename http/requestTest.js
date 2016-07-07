var http = require('http');
var querystring = require('querystring');

// 构建请求内容
var postData = querystring.stringify({
    'content':'第三次请求测试',
    'cid':348
});

// 请求头
var options = {
    hostname: 'www.imooc.com',
    port:80,
    path: "/course/docomment",
    method: "post",
    headers:{
        'Accept':'application/json, text/javascript, */*; q=0.01',
        'Accept-Encoding':'gzip, deflate',
        'Accept-Language':'zh-CN,zh;q=0.8,en;q=0.6',
        'Cache-Control':'no-cache',
        'Connection':'keep-alive',
        'Content-Length':postData.length,
        'Content-Type':'application/x-www-form-urlencoded; charset=UTF-8',
        'Cookie':'imooc_uuid=a6a7d3cc-2ffa-42c3-8e51-3d9e44577a2a; imooc_isnew_ct=1455202075; PHPSESSID=ope8ge0cqksmbjmadeppmvrvm1; loginstate=1;apsid=E0ZjNlZjY3MTcxNzlkZjMyYjY2YTFjMzIyY2I5ODIAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAMjEwNTgxOQAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAxOTU0MDY3MDhAcXEuY29tAAAAAAAAAAAAAAAAAAAAADdmMmQ5ZjI4NzRmOTFjM2U3ODk5NTA4NDc4YTFjMjdmr2Z8V69mfFc%3DYm; last_login_username=195406708%40qq.com; jwplayer.qualityLabel=è¶æ¸; Hm_lvt_f0cfcccd7b1393990c78efdeebff3968=1466153502; Hm_lpvt_f0cfcccd7b1393990c78efdeebff3968=1467881361; imooc_isnew=2; cvde=56bc9f1bb10f6-208',
        'Host':'www.imooc.com',
        'Origin':'http://www.imooc.com',
        'Pragma':'no-cache',
        'Referer':'http://www.imooc.com/video/8837/0',
        'User-Agent':'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_11_3) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/51.0.2704.106 Safari/537.36',
        'X-Requested-With':'XMLHttpRequest'
    }
}

// 发送请求
var req = http.request(options, function(res) {
    console.log('status:' + res.statusCode);
    console.log('headers:' + JSON.stringify(res.headers));
    
    res.on('data', function(data){
        console.log(Buffer.isBuffer(data));
        console.log(typeof data);        
    });
     
    res.on('end', function(data){
        console.log('评论完毕！');
    })
}).on('error', function(e){
    console.log('error:'+e.message);
})

// 发送请求数据
req.write(postData);

// 结束请求
req.end();