import * as Phaser from "phaser-ce";
import Client from "../../server/client";
import Hero from "../sprites/Hero";
import { debug } from "../utils/debug";
const debugging = false;

interface Game {
    hero: any;
    platforms: any;
    cursors: any;
    hitPlatform: any;
    players: any;
}

class Game extends Phaser.State {
    public create() {
        this.game.world.setBounds(0, 0, 900, 600);

        this.game.physics.startSystem(Phaser.Physics.ARCADE);

        this.platforms = this.game.add.group();
        this.platforms.enableBody = true;

        const ground = this.platforms.create(0, this.game.world.height - 64, "platform");
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        let ledge = this.platforms.create(400, 300, "platform");
        ledge.scale.setTo(1, 0.5);
        ledge.body.immovable = true;

        ledge = this.platforms.create(0, 420, "platform");
        ledge.scale.setTo(0.5, 0.5);
        ledge.body.immovable = true;

        this.cursors = this.game.input.keyboard.createCursorKeys();
        // this.hero.dir = false;
        this.players = {};
        Client.askNewPlayer();
    }

    public addNewPlayer(id, x, y, thisPlayerId) {
        const isHero = (thisPlayerId === id);
        const name = isHero ? "hero" : `player${id}`;
        this.players[name] = new Hero({
            asset: "hero",
            follow: isHero,
            game: this.game,
            state: this,
            x,
            y,
        });
        this.game.add.existing(this.players[name]);
    }

    public removePlayer(id) {
        this.players["player" + id].destroy();
        delete this.players["player" + id];
    }

    public render() {
        if (debugging) {
            debug("sprite-box", this.players.hero);
        }
    }
}

export default Game;
