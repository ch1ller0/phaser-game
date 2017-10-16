import * as Phaser from "phaser-ce";

interface Hero extends Phaser.Sprite {
    state: any;
    isHero: boolean;
    dir: boolean;
}

class Hero extends Phaser.Sprite {
    constructor({ asset, game, isHero, x, y }) {
        super(game, x, y, asset);

        this.state = game.state.callbackContext;
        this.isHero = isHero;

        this.anchor.setTo(0.5);

        if (isHero) {
            game.camera.follow(this);
        }

        game.physics.arcade.enable(this);

        this.body.bounce.y = 0.2;
        this.body.gravity.y = 300;
        this.body.collideWorldBounds = true;
        this.dir = true;

        this.animations.add("left", [0, 1, 2, 3, 4, 5, 6], 15, true);
        this.animations.add("right", [7, 8, 9, 10, 11, 12, 13], 15, true);
    }

    public update() {
        // this.body.gravity.y = 300;
        this.state.hitPlatform = this.game.physics.arcade.collide(this, this.state.platforms);
        this.body.velocity.x = 0;

        if (this.state.cursors.left.isDown && this.isHero) {
            this.body.velocity.x = -200;
            this.animations.play("left");
            this.dir = true;

        } else if (this.state.cursors.right.isDown && this.isHero) {
            this.body.velocity.x = 200;
            this.animations.play("right");
            this.dir = false;

        } else {
            this.animations.stop();
            this.frame = this.dir ? 0 : 7;
        }

        if (this.state.cursors.up.isDown && this.body.touching.down && this.state.hitPlatform && this.isHero) {
                this.body.velocity.y = -270;
        }
    }
}

export default Hero;
