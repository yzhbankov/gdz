/**
 * Created by Iaroslav Zhbankov on 12.02.2017.
 */
var express = require('express');
app = express();
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var disciplineTitles = require('./public/db/discipline-titles-data');

app.use(bodyParser());
app.use(bodyParser.text({defaultCharset: 'utf-8'}));
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
    res.render('title.jade');
});

app.get('/:class/:predmet', function (req, res) {
    var titles = [];
    var urls = [];
    var discipline = req.params.predmet;
    obj.forEach(function (item, index) {
        if ((item.urlObject['class'] == req.params.class) && (item.urlObject['bookTitle'] == req.params.predmet)) {
            if (item.title == null) {
                titles.push(item.urlObject['bookTitle']);
            } else {
                titles.push(item.title);
            }
            urls.push(item.urlObject['titleUrl']);
        }
    });
    res.render('allbooks.jade', {
        "klass": req.params.class,
        "titles": titles,
        "urls": urls,
        "pageTitle": disciplineTitles[discipline]
    });
});

app.get('/:class/:predmet/:url', function (req, res) {
    var content = '';
    obj.forEach(function (item, index) {
        if (item.urlObject['titleUrl'] == req.params.url) {
            content = item['htmlText'];
        }
    });
    res.render('book.jade', {
        "content": content
    });
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Listening port 3000');
});