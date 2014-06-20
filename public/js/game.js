var game = new Phaser.Game(1200, 600, Phaser.AUTO, '', { preload: preload, create: create, update: update });

function preload() {
  game.load.image('sky', 'assets/sky.png');
  game.load.image('cloud1', 'assets/cloud1.png');
  game.load.image('cloud2', 'assets/cloud2.png');
  game.load.image('ground', 'assets/ground.png');
  game.load.image('home', 'assets/home.png');
  game.load.spritesheet('monk', 'assets/monk.png', 80, 103);
}

var platfors;
var player;
var cursors;
var homeSpace;
var finishLine;

function create() {
  game.world.setBounds(0, 0, 1200, 3200);
  game.physics.startSystem(Phaser.Physics.ARCATE);
  game.add.sprite(0, 0, 'sky');
  game.add.sprite(0, 600, 'sky');
  game.add.sprite(0, 1200, 'sky');
  game.add.sprite(0, 1800, 'sky');
  game.add.sprite(0, 2400, 'sky');
  homeSpace = game.add.group();
  homeSpace.enableBody = true;
  platforms = game.add.group();
  platforms.enableBody = true;
  var ground = platforms.create(0, game.world.height - 188, 'ground');
  ground.body.immovable = true;


  var xes = [50, 250, 450, 650, 850, 1050 ];
  var cloud;

  for(var i = 2; i < 15; i++) {
    for(var j = 0; j < 4; j++) {
      var random = [0,1,2,3,4,5][Math.floor(Math.random()*5)];
      var randomCloud = 'cloud' + (random % 2 + 1);
      var offset = 0;
      if(i % 2 === 0) offset = 100; 
      cloud = platforms.create(xes[random] + offset, i * 200, randomCloud);
      cloud.body.immovable = true;
    }
  }

  finishLine = homeSpace.create(300, 0, 'home');
  finishLine.body.immovable = true;

  writeInstructions();

  player = game.add.sprite(560, game.world.height - 150, 'monk');

  game.physics.arcade.enable(player);

  player.body.bounce.y = 0.35;
  player.body.gravity.y = -15;
  player.body.collideWorldBounds = true;

  player.animations.add('left', [3, 4], 10, true);
  player.animations.add('right', [0, 1], 10, true);

  cursors = game.input.keyboard.createCursorKeys();

  game.camera.follow(player);

}

function writeInstructions() {
  var text404 = game.add.text(game.world.centerX, 2650, '404');
  text404.anchor.set(0.5);
  text404.align = 'center';

  text404.font = 'Arial Black';
  text404.fontSize = 50;
  text404.fontWeight = 'bold';
  text404.fill = '#fff';

  text404.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 5);

  var message = game.add.text(game.world.centerX, 2700, 'Oh snap! You got lost!');
  message.anchor.set(0.5);
  message.align = 'center';

  message.font = 'Arial';
  message.fontSize = 30;
  message.fontWeight = 'normal';
  message.fill = '#fff';

  message.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 5);

  var instructions = game.add.text(game.world.centerX, 2750, 'Help the MonkGolfier to go back home (⍇ ⍈)');
  instructions.anchor.set(0.5);
  instructions.align = 'center';

  instructions.font = 'Arial';
  instructions.fontSize = 30;
  instructions.fontWeight = 'normal';
  instructions.fill = '#fff';

  instructions.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 5);
}

var redirected = false;

function endGame(player, finishLine) {
  if(!redirected) {
    redirected = true;
    window.location.href = 'http://wearemonk.com';
  }
}

function update() {
  game.physics.arcade.collide(player, platforms);

  game.physics.arcade.overlap(finishLine, player, endGame, null, this);

  // Max flight vertical speed
  if (player.body.velocity.y < -50) player.body.velocity.y = -50;

  // Max flight horizontal speed
  if (player.body.velocity.x > 0) player.body.velocity.x -= 1;
  if (player.body.velocity.x < 0) player.body.velocity.x += 1;

  if (cursors.left.isDown) {
    player.body.velocity.x = -75;
    player.animations.play('left');
  } else if (cursors.right.isDown) {
    player.body.velocity.x = 75;
    player.animations.play('right');
  } else {
    player.animations.stop();
    player.frame = 2;
  }

  game.camera.y -= 4;
}

var socket = io();

socket.on('turn left', function(mgs) {
  player.body.velocity.x = -75;
  player.animations.play('left');
});

socket.on('turn right', function(mgs) {
  player.body.velocity.x = 75;
  player.animations.play('right');
});
