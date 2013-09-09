
var express = require('express'),
    app = express(),
    path = require('path'),
    http = require('http');

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname, '../')));

http.createServer(app).listen(3000);