import "p2";
import * as Phaser from "phaser-ce";
import "pixi";

// tslint:disable-next-line
declare global {
    interface Window {
        game: any;
        globalDebug: boolean;
    }
}
window.game = window.game || {};
window.globalDebug = true;

import BootState from "./states/Boot";
import GameState from "./states/Game";
import SplashState from "./states/Splash";

import config from "./config";

class GlobalGame extends Phaser.Game {
    constructor() {
        const docElement = document.documentElement;
        const width = docElement.clientWidth > config.gameWidth ? config.gameWidth : docElement.clientWidth;
        const height = docElement.clientHeight > config.gameHeight ? config.gameHeight : docElement.clientHeight;

        super(width, height, Phaser.AUTO, "content", null);

        this.state.add("Boot", BootState, false);
        this.state.add("Splash", SplashState, false);
        this.state.add("Game", GameState, false);

        this.state.start("Boot");
  }
}

window.game = new GlobalGame();
