import * as Phaser from "phaser-ce";
import Mushroom from "../sprites/Mushroom";

interface Game {
    mushroom: any;
}

class Game extends Phaser.State {

  public create() {
    const bannerText = "Phaser + ES6 + Webpack";
    const banner = this.add.text(this.world.centerX, this.game.height - 80, bannerText);
    banner.font = "Bangers";
    banner.padding.set(10, 16);
    banner.fontSize = 40;
    banner.fill = "#77BFA3";
    banner.smoothed = false;
    banner.anchor.setTo(0.5);

    this.mushroom = new Mushroom({
      asset: "mushroom",
      game: this,
      x: this.world.centerX,
      y: this.world.centerY,
    });

    this.game.add.existing(this.mushroom);
  }

  public render() {
    if (__DEV__) {
      this.game.debug.spriteInfo(this.mushroom, 32, 32);
    }
  }
}

export default Game;
