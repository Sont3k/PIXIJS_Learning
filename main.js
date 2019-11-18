import * as PIXI from "pixi.js";

const app = new PIXI.Application({ transparent: true });
document.body.appendChild(app.view);

// create a new Sprite from an image path.
const banan = PIXI.Sprite.from('./assets/banan.png');

// center the sprite's anchor point
banan.anchor.set(0.5);

// move the sprite to the center of the screen
banan.x = app.screen.width / 2;
banan.y = app.screen.height / 2;

app.stage.addChild(banan);

app.ticker.add(() => {
    // just for fun, let's rotate mr rabbit a little
    banan.rotation += 0.1;
});


