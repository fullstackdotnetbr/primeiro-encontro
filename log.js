var util = require('gulp-util')

'use strict';

function log(msg) {
    if (typeof (msg) === 'object') {
        for (var item in msg) {
            if (msg.hasOwnProperty(item)) util.log(util.colors.yellow(msg[item]))
        }
    } else {
        util.log(util.colors.yellow(msg))
    }
}

module.exports = log; 