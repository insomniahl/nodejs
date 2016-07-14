'use strict'
var util = require('util');

function log() {
    process.stdout.write(util.format.apply(util, arguments) + '\n');
}

log("hello nodejs");