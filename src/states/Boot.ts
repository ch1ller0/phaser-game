import * as Phaser from "phaser-ce";
import * as WebFont from "webfontloader";

export default class extends Phaser.State {
  public init() {
    this.stage.backgroundColor = "#EDEEC9";
    this.fontsReady = false;
    this.fontsLoaded = this.fontsLoaded.bind(this);
  }

  public preload() {
    WebFont.load({
        active: this.fontsLoaded,
        google: {
        families: ["Bangers"],
      },
    });

    const text = this.add.text(this.world.centerX, this.world.centerY, "loading fonts", { font: "16px Arial", fill: "#dddddd", align: "center" }); /* tslint:disable */
    text.anchor.setTo(0.5, 0.5);

    this.load.image("loaderBg", "./assets/images/loader-bg.png");
    this.load.image("loaderBar", "./assets/images/loader-bar.png");
  }

  public render() {
    if (this.fontsReady) {
      this.state.start("Splash");
    }
  }

  public fontsLoaded() {
    this.fontsReady = true;
  }
}
