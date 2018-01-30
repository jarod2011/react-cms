var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');

var app = express();

app.use(express.static(__dirname + '/dist'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.get('*', function(req, res) {
    res.sendFile(__dirname + '/app.html');
});

app.listen(3000, function() {
    console.log("服务已经启动..")
});