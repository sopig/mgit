const marked = require('marked')
const fs = require('fs')
const hljs = require('highlight.js')
const path = require('path')
const walk = require('./walk')
const buffer = require('buffer')

let begin=`<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta http-equiv="X-UA-Compatible" content="ie=edge">
    <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0-beta.2/css/bootstrap.min.css" integrity="sha384-PsH8R72JQ3SOdhVi3uxftmaW6Vc51MKb0q5P2rRUpPvrszuE4W1povHYgTpBfshb" crossorigin="anonymous">
    <link rel="stylesheet" href="http://cdn.bootcss.com/highlight.js/8.0/styles/monokai_sublime.min.css">
    <script src="http://cdn.bootcss.com/highlight.js/8.0/highlight.min.js"></script>
    <style>
    h1,
    h2,
    h3,
    h4,
    h5,
    h6,
    p,
    blockquote {
        margin: 0;
        padding: 0;
    }
    body {
        font-family: "Helvetica Neue", Helvetica, "Hiragino Sans GB", Arial, sans-serif;
        font-size: 13px;
        line-height: 18px;
        color: #737373;
        background-color: white;
        margin: 10px 13px 10px 13px;
    }
    table {
        margin: 10px 0 15px 0;
        border-collapse: collapse;
    }
    td,th { 
        border: 1px solid #ddd;
        padding: 3px 10px;
    }
    th {
        padding: 5px 10px;  
    }
    
    a {
        color: #0069d6;
    }
    a:hover {
        color: #0050a3;
        text-decoration: none;
    }
    a img {
        border: none;
    }
    p {
        margin-bottom: 9px;
    }
    h1,
    h2,
    h3,
    h4,
    h5,
    h6 {
        color: #404040;
        line-height: 36px;
        font-weight: bold;
    }
    h1 {
        margin-bottom: 18px;
        font-size: 30px;
    }
    h2 {
        font-size: 24px;
    }
    h3 {
        font-size: 18px;
    }
    h4 {
        font-size: 16px;
    }
    h5 {
        font-size: 14px;
    }
    h6 {
        font-size: 13px;
    }
    hr {
        margin: 0 0 19px;
        border: 0;
        border-bottom: 1px solid #ccc;
    }
    blockquote {
        font-size: 18px
        padding: 12px;
        border-left: #ccc 3px solid
    }
 
    blockquote p {
        font-weight: 300;
        line-height: 18px;
        margin: 12px;
    }
    code, pre {
        font-family: Monaco, Andale Mono, Courier New, monospace;
    }
    code {
        background-color: #fee9cc;
        color: rgba(0, 0, 0, 0.75);
        padding: 1px 3px;
        font-size: 12px;
        -webkit-border-radius: 3px;
        -moz-border-radius: 3px;
        border-radius: 3px;
    }
    pre {
        background-color: #111;
        display: block;
        padding: 14px;
        margin: 0 0 18px;
        line-height: 16px;
        font-size: 11px;
        border: 1px solid #d9d9d9;
        white-space: pre-wrap;
        word-wrap: break-word;
    }
    pre code {
        font-size: 11px;
        padding: 0;
        color: #9feaf9;
    }
    sup {
        font-size: 0.83em;
        vertical-align: super;
        line-height: 0;
    }
    img {
        max-width: 854px;
    }
    * {
        -webkit-print-color-adjust: exact;
    }
    @media screen and (min-width: 914px) {
        body {
            max-width:854px;
            margin:10px auto;
        }
    }
    @media print {
        body,code,pre code,h1,h2,h3,h4,h5,h6 {
          
        }
        table, pre {
            page-break-inside: avoid;
        }
    }
   </style>
</head>
<body>`

let end=`</body>
</html>`


walk(path.join(__dirname,'doc')).forEach( item =>{

    if(path.extname(item) !== '.md') {
        console.log('just working with markdown files')
        return
    }

    fs.readFile(item,'utf8',(err,data) =>{
       
        marked.setOptions({
            highlight: function (code) {
              return require('highlight.js').highlightAuto(code).value;
            }
          });


          let content = begin + marked(data) + end
          let name = path.parse(item).name
          fs.writeFile(path.join(__dirname,'dist/'+name+'.html'), content, (err) => {
            if (err) throw err;
            console.log(name + '.html done!');
          });

    })
})




