import * as Phaser from "phaser-ce";

interface Hero {
    state: any;
    follow: any;
}

export default class extends Phaser.Sprite {
    constructor({ asset, follow, game, state, x, y }) {
        super(game, x, y, asset);

        this.state = state;
        this.follow = follow;

        this.anchor.setTo(0.5);

        if (follow) {
            game.camera.follow(this);
        }

        game.physics.arcade.enable(this);

        this.body.bounce.y = 0.2;
        // this.body.gravity.y = 300;
        this.body.collideWorldBounds = true;

        this.animations.add("left", [0, 1, 2, 3, 4, 5, 6], 15, true);
        this.animations.add("right", [7, 8, 9, 10, 11, 12, 13], 15, true);
    }

    public update() {
        this.body.gravity.y = 300;
        this.state.hitPlatform = this.game.physics.arcade.collide(this, this.state.platforms);
        this.body.velocity.x = 0;

        if (this.state.cursors.left.isDown && this.follow) {
            this.body.velocity.x = -200;
            this.animations.play("left");
            this.dir = true;

        } else if (this.state.cursors.right.isDown && this.follow) {
            this.body.velocity.x = 200;
            this.animations.play("right");
            this.dir = false;

        } else {
            this.animations.stop();
            this.frame = this.dir ? 0 : 7;
        }

        if (this.state.cursors.up.isDown && this.body.touching.down && this.state.hitPlatform && this.follow) {
                this.body.velocity.y = -270;
        }
    }
}
