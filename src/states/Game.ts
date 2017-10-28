import * as Phaser from "phaser-ce";
import Client from "../client/client.js";
import Hero from "../sprites/Hero";
import { debug } from "../utils/debug";

interface Game extends Phaser.State {
    hero: any;
    platforms: any;
    cursors: any;
    players: {
        hero?: object;
    };
}

class Game extends Phaser.State {
    public create() {

        this.stage.disableVisibilityChange = true; // disable pause on blur
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
        this.players = {};
        Client.askNewPlayer();
    }

    public addNewPlayer(id, x, y, thisPlayerId) {
        const isHero = (thisPlayerId === id);
        const name = isHero ? "hero" : `player${id}`;
        this.players[name] = new Hero({
            asset: "hero",
            game: this.game,
            isHero,
            x,
            y,
        });
        this.game.add.existing(this.players[name]);
    }

    public playerMove({playerID, position}) {
        const player = this.players[`player${playerID}`];
        if (player) {
            if (player.position.x > position.x) {
                player.animations.play("left");
            } else if (player.position.x < position.x) {
                player.animations.play("right");
            } else {
                player.animations.stop();
            }
            player.position = position;
        }
    }

    public removePlayer(id) {
        this.players["player" + id].destroy();
        delete this.players["player" + id];
    }

    public render() {
        if (window.globalDebug && this.players.hero) {
            debug("camera-info", this.players.hero);
        }
    }
}

export default Game;
