define(function () {
  return {
    preload: function() {
      this.load.onLoadComplete.addOnce(this.onLoadComplete, this);
      console.log('preloading assets');
      this.load.image('sky', 'assets/sky.png');
      this.load.image('cloud1', 'assets/cloud1.png');
      this.load.image('cloud2', 'assets/cloud2.png');
      this.load.image('ground', 'assets/ground.png');
      this.load.image('home', 'assets/home.png');
      this.load.spritesheet('monk', 'assets/monk.png', 80, 103);
    },

    onLoadComplete: function() {
      console.log('loaded');
      this.game.state.start('menu');
    },

    create: function() {
    }
  };
});
