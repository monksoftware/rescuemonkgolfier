var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

var bodyParser = require('body-parser');
var path = require('path');

var arduino = require('./arduinoCtrl');
arduino.arduinoCtrl(io);

app.use(bodyParser());

app.use(express.static(__dirname + '/public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

io.on('connection', function(socket) {
  console.log('a user connected');
  socket.on('controls', function(msg) {
    console.log(msg);
    socket.broadcast.emit(msg);
  });
  socket.on('end game', function(msg) {
    console.log(msg);
    socket.broadcast.emit("you won","finish");
  });
});

app.get('/arduino', function(req, res, next) {
  res.render('arduino');
});

http.listen(3000, function() {
  console.log('Listening on port %d', http.address().port);
});
