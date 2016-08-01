var http = require("http");
var promise = require("bluebird");
var cheerio = require("cheerio");

var baseUrl = "http://www.imooc.com/learn/";
var videoIds = [348, 259];
var fetchCourseArray = [];

// 获取需要爬取的页面
videoIds.forEach((id) => {
    fetchCourseArray.push(getPageAsync(baseUrl + id));
})

// promise
promise
    .all(fetchCourseArray)
    .then((pages) => {
        var coursesData = [];
        pages.forEach((html) => {
            var courses = filterChapters(html);
            coursesData.push(courses);
        });
        coursesData.sort((a, b) => {
            return a.number < b.number;
        })
        printCourseInfo(coursesData);
    })

//爬取页面
function getPageAsync(url){
    return new promise((resolve, reject) => {
        console.log(`正在爬取 ${url}`);
        http.get(url, (res) => {
            var html = "";
            res.on('data', (data) => {
                html += data;
            });
            res.on('end', () => {
                // 保持链式调用
                resolve(html);
                // var coursesData = filterChapters(html);
                // printCourseInfo(courseData);
            })
        }).on('error', (error) => {
            reject(error);
            console.log("获取课程数据出错！");
        })
    })
}

// 筛选页面内容
function filterChapters(html) {
    var $ = cheerio.load(html);
    var chapters = $(".chapter");
    var title = $("h2.l").text();
    var number = parseInt($($(".static-item span.meta-value strong")[3]).text().trim(), 10);

    var courseData = {
        title: title,
        number: number,
        videos: []
    };

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

        courseData.videos.push(chapterData);
    })

    return courseData;
}

// 打印筛选内容
function printCourseInfo(coursesData){
    coursesData.forEach((courseData) => {
        console.log(`${courseData.number} 人学过 ${courseData.title}\n`);
    })
    coursesData.forEach(function(courseData){
        console.log(`### ${courseData.title}\n`);
        courseData.videos.forEach((item) => {
            var chapterTitle = item.chapterTitle;
            console.log(chapterTitle + "\n");
            item.videos.forEach((video) => {
                console.log(`【${video.id}】 ${video.title} \n`);
            })
        })
    })
}