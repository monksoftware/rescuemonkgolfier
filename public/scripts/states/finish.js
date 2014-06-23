define(function () {
  return {
    preload: function() {
    },

    create: function() {
      this.socket = io();
      this.game.add.sprite(0, 0, 'sky');
      this.game.world.setBounds(0, 0, 1200, 600);

      this.socket.emit('finish');

      setTimeout(function() {
        window.location.href = 'http://www.wearemonk.com';
      }, 500);
    }
  };
});
