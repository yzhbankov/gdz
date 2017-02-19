/**
 * Created by Iaroslav Zhbankov on 12.02.2017.
 */
var express = require('express');
app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');

app.use(bodyParser());
app.use("/", express.static('public'));
app.use("/:class/:predmet", express.static('public'));
app.use("/:class/:predmet/:url", express.static('public'));
app.use("/gettraderequestinfo", express.static('public'));

app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    fs.readFile(path.join(__dirname, '/public', 'db/data.json'), function (err, data) {
        obj = JSON.parse(data);
    });
    res.render('index.jade');
});

app.get('/:class/:predmet', function(req, res){
    var titles = [];
    var urls = [];
    obj.forEach(function (item, index) {
        if ((item.urlObject['class'] == req.params.class)&&(item.urlObject['bookTitle'] == req.params.predmet)) {
            titles.push(item.urlObject['bookTitle']);
            urls.push(item.urlObject['titleUrl']);
        }
    });
    res.render('allbooks.jade', {
        "klass": req.params.class,
        "titles": titles,
        "urls": urls
    });
});
/*app.get('/:class', function(req, res){
 var titles = [];
 var urls = [];
 obj.forEach(function (item, index) {
 if (item.urlObject['class'] == req.params.class) {
 titles.push(item.urlObject['bookTitle']);
 urls.push(item.urlObject['titleUrl']);
 }
 });
 res.render('allbooks.jade', {
 "klass": req.params.class,
 "titles": titles,
 "urls": urls
 });
 });*/
app.get('/:class/:predmet/:url', function(req, res){

    obj.forEach(function (item, index) {
        if (item.urlObject['titleUrl'] == req.params.url) {
            res.render('book.jade', {
                "content": item['htmlText']
            });
        }
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Listening port 3000');
});