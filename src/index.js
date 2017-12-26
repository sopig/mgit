const marked = require('marked')
const fs = require('fs')
const hljs = require('highlight.js')
const path = require('path')
const walk = require('./walk')
const buffer = require('buffer')

let begin = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <link rel="stylesheet" href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css">
    <script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
    <link rel="stylesheet" href="../src/css/style.css">
</head>
<body>`

let end = `</body>
</html>`


walk(path.join(__dirname, '../doc')).forEach(item => {

    if (path.extname(item) !== '.md') {
        console.log('just working with markdown files')
        return
    }

    fs.readFile(item, 'utf8', (err, data) => {

        marked.setOptions({
            highlight: function (code) {
                return require('highlight.js').highlightAuto(code).value;
            }
        });


        let content = begin + marked(data) + end
        let name = path.parse(item).name
        fs.writeFile(path.join(__dirname, '../dist/' + name + '.html'), content, (err) => {
            if (err) throw err;
            console.log(name + '.html done!');
        });

    })
})