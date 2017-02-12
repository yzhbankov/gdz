/**
 * Created by Iaroslav Zhbankov on 12.02.2017.
 */
var express = require('express');
app = express();
var MongoClient = require('mongodb').MongoClient;
//var url = 'mongodb://yzhbankov:password1360@ds157248.mlab.com:57248/heroku_8l7mbnvd';
var url = 'mongodb://localhost:27017/gdz';

app.use("/", express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.set('views', __dirname + '/views');
app.set('view engine', 'jade');

app.get('/', function (req, res) {
    if (!req.session.user) {
        res.render('index.jade', {});
    } else {
        res.render('index.jade');
    }
});

app.listen(process.env.PORT || 3000, function () {
    console.log('Listening port 3000');
});