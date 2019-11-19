import * as PIXI from "pixi.js";

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

const sprites = new PIXI.ParticleContainer(10000, {
  scale: true,
  position: true,
  rotation: true,
  uvs: true,
  alpha: true
});

app.stage.addChild(sprites);

// create an array to store all the sprites
const bananas = [];

const totalSprites = app.renderer instanceof PIXI.Renderer ? 10000 : 100;

for (let i = 0; i < totalSprites; i++) {
  // create a new Sprite
  const banana = PIXI.Sprite.from("./assets/banana_small.png");

  banana.tint = Math.random() * 0xe8d4cd;

  // set the anchor point so the texture is centerd on the sprite
  banana.anchor.set(0.5);

  // different bananas, different sizes
  banana.scale.set(0.8 + Math.random() * 0.3);

  // scatter them all
  banana.x = Math.random() * app.screen.width;
  banana.y = Math.random() * app.screen.height;

  banana.tint = Math.random() * 0x808080;

  // create a random direction in radians
  banana.direction = Math.random() * Math.PI * 2;

  // this number will be used to modify the direction of the sprite over time
  banana.turningSpeed = Math.random() - 0.8;

  // create a random speed between 0 - 2, and these bananas are slooww
  banana.speed = (2 + Math.random() * 2) * 0.2;

  banana.offset = Math.random() * 100;

  // finally we push the banana into the bananas array so it it can be easily accessed later
  bananas.push(banana);

  sprites.addChild(banana);
}

// create a bounding box for the little bananas
const bananaBoundsPadding = 100;
const bananaBounds = new PIXI.Rectangle(
  -bananaBoundsPadding,
  -bananaBoundsPadding,
  app.screen.width + bananaBoundsPadding * 2,
  app.screen.height + bananaBoundsPadding * 2
);

let tick = 0;

app.ticker.add(() => {
  // iterate through the sprites and update their position
  for (let i = 0; i < bananas.length; i++) {
    const banana = bananas[i];
    banana.scale.y = 0.95 + Math.sin(tick + banana.offset) * 0.05;
    banana.direction += banana.turningSpeed * 0.01;
    banana.x += Math.sin(banana.direction) * (banana.speed * banana.scale.y);
    banana.y += Math.cos(banana.direction) * (banana.speed * banana.scale.y);

    // wrap the bananas
    if (banana.x < bananaBounds.x) {
      banana.x += bananaBounds.width;
    } else if (banana.x > bananaBounds.x + bananaBounds.width) {
      banana.x -= bananaBounds.width;
    }

    if (banana.y < bananaBounds.y) {
      banana.y += bananaBounds.width;
    } else if (banana.y > bananaBounds.y + bananaBounds.height) {
      banana.y -= bananaBounds.height;
    }
  }

  // increment the ticker
  tick += 0.1;
});
