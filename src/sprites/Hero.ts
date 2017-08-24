import * as Phaser from "phaser-ce";

export default class extends Phaser.Sprite {
  constructor({ game, x, y, asset }) {
    super(game, x, y, asset);
    this.anchor.setTo(0.5);
  }
  public render() {
    this.game.physics.arcade.enable(this);

//  Player physics properties. Give the little guy a slight bounce.
    this.body.bounce.y = 0.2;
    this.body.gravity.y = 300;
    this.body.collideWorldBounds = true;

//  Our two animations, walking left and right.
    this.animations.add("left", [0, 1, 2, 6], 10, true);
    this.animations.add("right", [7, 6, 7, 13], 10, true);
  }
}
