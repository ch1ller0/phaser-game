import * as Phaser from "phaser-ce";

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
    game.physics.arcade.enable(this);

    this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;

    this.animations.add("left", [0, 1, 2, 3, 4, 5, 6], 15, true);
    this.animations.add("right", [7, 8, 9, 10, 11, 12, 13], 15, true);
  }
}
