define(function () {
  return {
    preload: function() {
    },

    create: function() {
      this.game.add.sprite(0, 0, 'sky');
      this.game.world.setBounds(0, 0, 1200, 600);

      window.location.href = 'http://www.wearemonk.com';
    }
  };
});
