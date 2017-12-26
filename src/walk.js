const fs = require('fs')

let fileList = []

function walk(inpath) {
    var dirList = fs.readdirSync(inpath)
    dirList.forEach(function (item) {
        if (fs.statSync(inpath + '/' + item).isDirectory()) {
            walk(inpath + '/' + item)
        } else {
            fileList.push(inpath + '/' + item)
        }
    });
    return fileList
}

module.exports = walk