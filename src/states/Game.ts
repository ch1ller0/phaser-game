import * as Phaser from "phaser-ce";
import Hero from "../sprites/Hero";
import { debug } from "../utils/debug";

const debugging = true;

interface Game {
    hero: any;
    platforms: any;
    cursors: any;
    hitPlatform: any;
}

class Game extends Phaser.State {

    public create() {
        game.world.setBounds(0, 0, 900, 600);

        game.physics.startSystem(Phaser.Physics.ARCADE);

        this.platforms = game.add.group();
        this.platforms.enableBody = true;

        const ground = this.platforms.create(0, game.world.height - 64, "platform");
        ground.scale.setTo(2, 2);
        ground.body.immovable = true;

        let ledge = this.platforms.create(400, 300, "platform");
        ledge.scale.setTo(1, 0.5);
        ledge.body.immovable = true;

        ledge = this.platforms.create(0, 420, "platform");
        ledge.scale.setTo(0.5, 0.5);
        ledge.body.immovable = true;

        this.hero = new Hero({
            asset: "hero",
            game,
            x: 300,
            y: 400,
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

    public render() {
        if (__DEV__ && debugging) {
            debug("input");
        }
    }
}

export default Game;
