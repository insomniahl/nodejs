var http = require('http');
var cheerio = require('cheerio');
var url = "http://www.imooc.com/learn/348";

function filterChapter(html) {
    var $ = cheerio.load(html);
    var chapters = $(".chapter");

    var courseData = [];

    chapters.each(function(value) {
        var chapter = $(this);
        var chapterTitle = chapter.find("strong").text();
        var videos = chapter.find(".video").children("li");
        var chapterData = {
            chapterTitle: chapterTitle,
            videos:[]
        };
        videos.each(function(value){
            var video = $(this).find(".studyvideo");
            var videoTitle = video.text();
            var id = video.attr("href").split("video/")[1];
            chapterData.videos.push({
                title:videoTitle,
                id:id
            })
        })

        courseData.push(chapterData);
    })

    return courseData;
}

function printCourseInfo(courseData){
    courseData.forEach(function(value){
        var chapterTitle = value.chapterTitle;
        console.log(chapterTitle + "\n");
        value.videos.forEach(function(value){
            console.log(`[${value.id}] ${value.title} \n`);
        })
    })
}

http.get(url, function(res) {
    var html = "";
    res.on('data', function(data) {
        html += data;
    })
    res.on('end', function(){
        var courseData = filterChapter(html);
        printCourseInfo(courseData);
    })
}).on('error', function(){
    console.log('获取课程数据出错');
})