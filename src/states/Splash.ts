import * as Phaser from "phaser-ce";
import { centerGameObjects } from "../utils";

interface Splash {
  loaderBar: any;
  loaderBg: any;
}

class Splash extends Phaser.State {

  public preload() {
    this.loaderBg = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "loaderBg");
    this.loaderBar = this.add.sprite(this.game.world.centerX, this.game.world.centerY, "loaderBar");
    centerGameObjects([this.loaderBg, this.loaderBar]);

    this.load.setPreloadSprite(this.loaderBar);
    //
    // load your assets
    //
    this.load.image("mushroom", "assets/images/mushroom2.png");
  }

  public create() {
    this.state.start("Game");
  }
}

export default Splash;
