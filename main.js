import * as PIXI from "pixi.js";

const app = new PIXI.Application();
document.body.appendChild(app.view);

// holder to store bananas
const bananas = [];

const totalBananas = 20;

for (let i = 0; i < totalBananas; i++) {
  // create a new Sprite that uses the image name that we just generated as its source
  const banana = PIXI.Sprite.from("./assets/banana_small.png");

  // set the anchor point so the texture is centerd on the sprite
  banana.anchor.set(0.5);

  // set a random scale for the banana - no point them all being the same size!
  banana.scale.set(0.8 + Math.random() * 0.3);

  // finally lets set the banana to be at a random position...
  banana.x = Math.random() * app.screen.width;
  banana.y = Math.random() * app.screen.height;

  banana.tint = Math.random() * 0xffffff;

  // create some extra properties that will control movement :
  // create a random direction in radians. This is a number between 0 and PI*2 which is the equivalent of 0 - 360 degrees
  banana.direction = Math.random() * Math.PI * 2;

  // this number will be used to modify the direction of the banana over time
  banana.turningSpeed = Math.random() - 0.8;

  // create a random speed for the banana between 0 - 2
  banana.speed = 2 + Math.random() * 2;

  // finally we push the bananaa into the bananaas array so it it can be easily accessed later
  bananas.push(banana);

  app.stage.addChild(banana);
}

// create a bounding box for the little dudes
const bananaBoundsPadding = 100;
const bananaBounds = new PIXI.Rectangle(
  -bananaBoundsPadding,
  -bananaBoundsPadding,
  app.screen.width + bananaBoundsPadding * 2,
  app.screen.height + bananaBoundsPadding * 2
);

app.ticker.add(() => {
  // iterate through the bananas and update their position
  for (let i = 0; i < bananas.length; i++) {
    const banana = bananas[i];
    banana.direction += banana.turningSpeed * 0.01;
    banana.x += Math.sin(banana.direction) * banana.speed;
    banana.y += Math.cos(banana.direction) * banana.speed;
    banana.rotation = -banana.direction - Math.PI / 2;

    // wrap the bananas by testing their bounds...
    if (banana.x < bananaBounds.x) {
      banana.x += bananaBounds.width;
    } else if (banana.x > bananaBounds.x + bananaBounds.width) {
      banana.x -= bananaBounds.width;
    }

    if (banana.y < bananaBounds.y) {
      banana.y += bananaBounds.height;
    } else if (banana.y > bananaBounds.y + bananaBounds.height) {
      banana.y -= bananaBounds.height;
    }
  }
});
