var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
var path = require('path');

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

io.on('connection', function(socket) {
  console.log('a user connected');
});

http.listen(3000, function() {
  console.log('Listening on port %d', http.address().port);
});
