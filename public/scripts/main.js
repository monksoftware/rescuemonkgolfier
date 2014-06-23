require(['states/boot', 'states/preload', 'states/menu', 'states/play', 'states/finish'], function(BootState, PreloadState, MenuState, PlayState, FinishState) {
  var game = new Phaser.Game(1200, 600, Phaser.AUTO);
  game.state.add('boot', BootState);
  game.state.add('preload', PreloadState);
  game.state.add('menu', MenuState);
  game.state.add('play', PlayState);
  game.state.add('finish', FinishState);

  game.state.start('boot');
});
