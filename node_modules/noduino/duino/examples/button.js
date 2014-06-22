var arduino = require('../');

var board = new arduino.Board();

var left = new arduino.Button({
  board: board,
  pin: 2
});

var right = new arduino.Button({
  board: board,
  pin: 4
});

left.on('down', function(){
  console.log('LEFT DOWN');
});

left.on('up', function(){
  console.log('LEFT UP');
});

right.on('down', function(){
  console.log('right DOWN');
});

right.on('up', function(){
  console.log('right UP');
});