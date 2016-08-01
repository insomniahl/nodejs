var fs = require("fs");

fs.createReadStream("").pipe(fs.createWriteStream(""));
