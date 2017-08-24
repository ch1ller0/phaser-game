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
    this.platforms = this.game.add.group();
    this.platforms.enableBody = true;

    // Here we create the ground.
    const ground = this.platforms.create(-50, this.game.world.height - 64, "platform");
    ground.scale.setTo(2, 2);
    ground.body.immovable = true;

    //  Now let's create two ledges
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
      y: this.world.height - 94,
    });

    this.game.add.existing(this.hero);
    this.cursors = this.game.input.keyboard.createCursorKeys();
  }
  public update() {
    this.hitPlatform = this.game.physics.arcade.collide(this.hero, this.platforms);
    /*console.log(this.hero);
    this.hero.body.velocity.x = 0;

    if (this.cursors.left.isDown) {
      this.hero.body.velocity.x = -150;
      this.hero.animations.play('left');

    } else if (this.cursors.right.isDown) {
      this.hero.body.velocity.x = 150;
      this.hero.animations.play('right');

    } else {
      this.hero.animations.stop();
      this.hero.frame = 4;
    }

    if (this.cursors.up.isDown && this.hero.body.touching.down && this.hitPlatform) {
      this.hero.body.velocity.y = -300;
    }*/

  }
}

export default Game;
