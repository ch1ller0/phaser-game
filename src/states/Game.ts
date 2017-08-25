import * as Phaser from "phaser-ce";
import Hero from "../sprites/Hero";

interface Game {
    hero: any;
    platforms: any;
    cursors: any;
    hitPlatform: any;
}

class Game extends Phaser.State {

  public create() {
    game.physics.startSystem(Phaser.Physics.ARCADE);

    this.platforms = game.add.group();
    this.platforms.enableBody = true;

    const ground = this.platforms.create(-50, game.world.height - 64, "platform");
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    let ledge = this.platforms.create(300, 100, "platform");
    ledge.scale.setTo(1, 0.5);
    ledge.body.immovable = true;

    ledge = this.platforms.create(-50, 220, "platform");
    ledge.scale.setTo(0.5, 0.5);
    ledge.body.immovable = true;

    this.hero = new Hero({
      asset: "hero",
      game,
      x: 300,
      y: 0,
    });

    game.add.existing(this.hero);
    this.cursors = game.input.keyboard.createCursorKeys();
    this.hero.dir = false;
  }

  public update() {
    this.hitPlatform = game.physics.arcade.collide(this.hero, this.platforms);
    this.hero.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      this.hero.body.velocity.x = -200;
      this.hero.animations.play("left");
      this.hero.dir = true;

    } else if (this.cursors.right.isDown) {
      this.hero.body.velocity.x = 200;
      this.hero.animations.play("right");
      this.hero.dir = false;

    } else {
      this.hero.animations.stop();
      this.hero.frame = this.hero.dir ? 0 : 7;
    }

    if (this.cursors.up.isDown && this.hero.body.touching.down && this.hitPlatform) {
      this.hero.body.velocity.y = -270;
    }

  }
}

export default Game;
