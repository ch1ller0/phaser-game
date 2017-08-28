export const debug = (type, target = undefined, {
    color = "white",
    filled = false,
} = {}) => {
    const game = PIXI.game;
    switch (type) {
        case "camera-line": return game.debug.camera(game.camera, color , filled);
        case "camera-info": return game.debug.cameraInfo(game.camera, 32, 32);
        case "display": return game.debug.spriteBounds(target);
        case "input": return game.debug.inputInfo(32, 32);
        case "pointer": return game.debug.pointer(game.input.activePointer);
        case "body-info": return game.debug.bodyInfo(target, 32 , 32);
        case "body-physics": return game.debug.body(target);
        case "sprite-info": return game.debug.spriteInfo(target, 32, 32);
        case "sprite-box": return game.debug.spriteBounds(target, color, filled);
        default: return null;
    }
};
