import * as Phaser from "phaser-ce";
import Client from "../server/client";
import Hero from "../sprites/Hero";
import { debug } from "../utils/debug";
const debugging = false;

interface Game {
    hero: any;
    platforms: any;
    cursors: any;
    hitPlatform: any;
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
        Client.askNewPlayer();
    }

    public addNewPlayer(id, x, y) {
        this["hero" + id] = new Hero({
            asset: "hero",
            game: this.game,
            x,
            y,
        });
        this.game.add.existing(this["hero" + id]);
    }

    public removePlayer(id) {
        this["hero" + id].destroy();
        delete this["hero" + id];
    }

    public update() {
        // this.hitPlatform = this.game.physics.arcade.collide(this.hero, this.platforms);
        // this.hero.body.velocity.x = 0;
        //
        // if (this.cursors.left.isDown) {
        //     this.hero.body.velocity.x = -200;
        //     this.hero.animations.play("left");
        //     this.hero.dir = true;
        //
        // } else if (this.cursors.right.isDown) {
        //     this.hero.body.velocity.x = 200;
        //     this.hero.animations.play("right");
        //     this.hero.dir = false;
        //
        // } else {
        //     this.hero.animations.stop();
        //     this.hero.frame = this.hero.dir ? 0 : 7;
        // }
        //
        // if (!this.hero.body.touching.down) {
        //     setTimeout( this.hero.frame = 6, 1000);
        // }
        //
        // if (this.cursors.up.isDown && this.hero.body.touching.down && this.hitPlatform) {
        //     this.hero.body.velocity.y = -270;
        // }
    }

    public render() {
        if (debugging) {
            debug("sprite-box", this.hero);
        }
    }
}

export default Game;
