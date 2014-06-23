define(function () {
  return {
    preload: function() {
      this.isTurningLeft = false;
      this.isTurningRight = false;
      this.redirected = false;
      this.platfors = null;
      this.player = null;
      this.cursors = null;
      this.homeSpace = null;
      this.finishLine = null;
      this.ground = null;
      this.socket = io();
    },

    create: function() {
      this.game.add.sprite(0, 0, 'sky');
      this.game.add.sprite(0, 600, 'sky');
      this.game.add.sprite(0, 1200, 'sky');
      this.game.add.sprite(0, 1800, 'sky');
      this.game.add.sprite(0, 2400, 'sky');

      this.game.world.setBounds(0, 0, 1200, 3200);
      this.game.physics.startSystem(Phaser.Physics.ARCATE);
      this.homeSpace = this.game.add.group();
      this.homeSpace.enableBody = true;
      this.platforms = this.game.add.group();
      this.platforms.enableBody = true;
      this.ground = this.platforms.create(0, this.game.world.height - 188, 'ground');
      this.ground.body.immovable = true;

      var xes = [75, 275, 475, 675, 875, 1075 ];
      var cloud;

      for(var i = 2; i < 15; i++) {
        for(var j = 0; j < 4; j++) {
          var random = [0,1,2,3,4,5][Math.floor(Math.random()*5)];
          var randomCloud = 'cloud' + (random % 2 + 1);
          var offset = 0;
          if(i % 2 === 0) offset = 100; 
          cloud = this.platforms.create(xes[random] + offset, i * 200, randomCloud);
          cloud.body.immovable = true;
        }
      }

      this.finishLine = this.homeSpace.create(300, 0, 'home');
      this.finishLine.body.immovable = true;

      this.player = this.game.add.sprite(560, this.game.world.height - 150, 'monk');

      this.game.physics.arcade.enable(this.player);

      this.player.body.bounce.y = 0.35;
      this.player.body.gravity.y = -15;
      this.player.body.collideWorldBounds = true;

      this.player.animations.add('left', [3, 4], 10, true);
      this.player.animations.add('right', [0, 1], 10, true);

      this.cursors = this.game.input.keyboard.createCursorKeys();

      this.game.camera.follow(this.player);

      var self = this;

      this.socket.on('turn left', function(msg) {
        self.turnLeft();
      });

      this.socket.on('turn right', function(msg) {
        self.turnRight();
      });
    },

    update: function() {
      this.game.physics.arcade.collide(this.player, this.platforms);

      this.game.physics.arcade.overlap(this.finishLine, this.player, this.endGame, null, this);

      if (this.player.body.velocity.y < -75) this.player.body.velocity.y = -75;

      if (this.player.body.velocity.x > 0) this.player.body.velocity.x -= 1;
      if (this.player.body.velocity.x < 0) this.player.body.velocity.x += 1;

      if (this.isTurningLeft) {
        this.player.animations.play('left');
        this.isTurningLeft = false;
      } else if (this.isTurningRight) {
        this.player.animations.play('right');
        this.isTurningRight = false;
      } else {
        this.player.animations.stop();
        this.player.frame = 2;
      }

      if (this.cursors.left.isDown) {
        this.turnLeft();
      } else if (this.cursors.right.isDown) {
        this.turnRight();
      } 

      this.game.camera.y -= 4;
    },

    turnLeft: function() {
      this.player.body.velocity.x = -75;
      this.isTurningLeft = true;
    },

    turnRight: function() {
      this.player.body.velocity.x = 75;
      this.isTurningRight = true;
    },

    endGame: function() {
      this.game.state.start('finish');
    }
  }
});
