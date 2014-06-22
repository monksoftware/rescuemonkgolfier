exports.arduinoCtrl = function (io) {
	var requirejs = require('requirejs');

	requirejs.config({nodeRequire: require});

	requirejs(['./node_modules/noduino/public/scripts/libs/Noduino', './node_modules/noduino/public/scripts/libs/Noduino.Serial', './node_modules/noduino/public/scripts/libs/Logger'], function (NoduinoObj, NoduinoConnector, Logger) {

	var Noduino = new NoduinoObj({'debug': false}, NoduinoConnector, Logger);
	  Noduino.connect(function(err, board) {
	    if (err) { return console.log(err); }
	    
	    led_4 = Object;
	    board.withLED({pin: 4}, function(err, LED) {
	      if (err) { return console.log(err); }
	      led_4 = LED;
	      led_4.on('on',function(){
	        setTimeout(function () {
	          led_4.setOff();
	        }, 250);
	      });
	      //led_4.on('off',function(){
	      //  setTimeout(function () {
	      //    led_4.setOn();
	      //  }, 2000);
	      //});
	    });

	    var led_7;
	    board.withLED({pin: 7}, function(err, LED) {
	      if (err) { return console.log(err); }
	      led_7 = LED;
	      led_7.on('on',function(){
	        setTimeout(function () {
	          led_7.setOff();
	        }, 250);
	      });
	      //led_4.on('off',function(){
	      //  setTimeout(function () {
	      //    led_4.setOn();
	      //  }, 2000);
	      //});
	    });

	    board.withButton({pin: 3}, function(err, Button) {
	      if (err) { return console.log(err); }
	      Button.on('push', function() {
	        console.log('Button left');
	        io.emit('turn left');
	        led_4.setOn();
	      });
	    });

	    board.withButton({pin: 6}, function(err, Button) {
	      if (err) { return console.log(err); }
	      Button.on('push', function() {
	        console.log('Button right');
	        io.emit('turn right');
	        led_7.setOn();
	      });
	    });


	  });

	});
};