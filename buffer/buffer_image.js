var fs = require("fs");

fs.readFile("logo.png", (err, buffer) => {

    console.log(Buffer.isBuffer(buffer));
    
    fs.writeFile('logo_buffer.png', buffer, (err) => {
        if(err){
            console.log(err);
        }
    })

    var base64Image = new Buffer(buffer.toString('base64'));

    console.log(base64Image);

    var decodeImage = new Buffer(base64Image, "base64");

    console.log(Buffer.compare(buffer, decodeImage));

    fs.writeFile('logo_decode.png', decodeImage, (err) => {
        if(err){
            console.log(err);
        }
    })
});