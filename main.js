import * as PIXI from "pixi.js";

const app = new PIXI.Application({ transparent: true });
document.body.appendChild(app.view);

// create a new Sprite from an image path.
const banana = PIXI.Sprite.from('./assets/banana.png');

// center the sprite's anchor point
banana.anchor.set(0.5);

// move the sprite to the center of the screen
banana.x = app.screen.width / 2;
banana.y = app.screen.height / 2;

app.stage.addChild(banana);

app.ticker.add(() => {
    // just for fun, let's rotate mr rabbit a little
    banana.rotation += 0.1;
});


