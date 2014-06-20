var express = require("express");
var bodyParser = require('body-parser');
var path = require('path');

var app = express();

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

var server = app.listen(3000, function() {
  console.log('Listening on port %d', server.address().port);
});
