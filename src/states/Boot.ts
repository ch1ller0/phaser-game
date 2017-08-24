import * as Phaser from "phaser-ce";
import * as WebFont from "webfontloader";

interface Boot {
  fontsReady: any;
}

class Boot extends Phaser.State {
  public init() {
    this.stage.backgroundColor = "#4a8bee";
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
    console.log(this);
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

export default Boot;
