'use strict'

process.on("SIGTERM", () => {
    console.log("welcome to child_1.js");
    process.exit(0);
});