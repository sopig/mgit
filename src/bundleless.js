const less = require('less')
const fs = require('fs')
const path = require('path')

fs.readFile(path.join(__dirname,'./css/header.less') ,'utf8', (err,data) =>{
    less.render(data, function (e, css) {
        console.log(css.css);
    });
})


