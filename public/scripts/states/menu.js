define(function () {
  return {
    preload: function() {
    },

    update: function() {
    },

    create: function() {
      this.game.add.sprite(0, 0, 'sky');
      this.game.add.sprite(0, 600, 'sky');
      this.game.add.sprite(0, 1200, 'sky');
      this.game.add.sprite(0, 1800, 'sky');
      this.game.add.sprite(0, 2400, 'sky');

      this.game.world.setBounds(0, 0, 1200, 3200);
      window.game = this.game;

      var text404 = this.game.add.text(this.game.world.centerX, 100, '404');
      text404.anchor.set(0.5);
      text404.align = 'center';

      text404.font = 'Arial Black';
      text404.fontSize = 50;
      text404.fontWeight = 'bold';
      text404.fill = '#fff';

      text404.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 5);

      var message = this.game.add.text(this.game.world.centerX, 150, 'Oh snap! You got lost!');
      message.anchor.set(0.5);
      message.align = 'center';

      message.font = 'Arial';
      message.fontSize = 30;
      message.fontWeight = 'normal';
      message.fill = '#fff';

      message.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 5);

      var instructions = this.game.add.text(this.game.world.centerX, 200, 'Help the MonkGolfier to go back home (⍇ ⍈)');
      instructions.anchor.set(0.5);
      instructions.align = 'center';

      instructions.font = 'Arial';
      instructions.fontSize = 30;
      instructions.fontWeight = 'normal';
      instructions.fill = '#fff';

      instructions.setShadow(0, 0, 'rgba(0, 0, 0, 0.5)', 5);

      this.startButton = this.game.add.button(this.game.world.centerX - 250, 300, 'startButton', this.startClick, this);
    },

    startClick: function() {
      this.game.state.start('play');
    }
  };
});
