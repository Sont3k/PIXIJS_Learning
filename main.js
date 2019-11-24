import * as PIXI from "pixi.js";

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

// create a new background sprite
const background = PIXI.Sprite.from("./assets/bg_rotate.jpg");
background.width = app.screen.width;
background.height = app.screen.height;
app.stage.addChild(background);

// create an array to store a reference to the bananas
const bananasArray = [];

const totalBananas = 20;

for (let i = 0; i < totalBananas; i++) {
  // create a new Sprite that uses the image name that we just generated as its source
  const banana = PIXI.Sprite.from("./assets/banana_small.png");

  banana.anchor.set(0.5);

  // set a random scale for the banana
  banana.scale.set(0.8 + Math.random() * 0.3);

  // finally let's set the banana to be at a random position...
  banana.x = Math.floor(Math.random() * app.screen.width);
  banana.y = Math.floor(Math.random() * app.screen.height);

  // The important bit of this example, this is how you change the default blend mode of the sprite
  banana.blendMode = PIXI.BLEND_MODES.ADD;

  // create some extra properties that will control movement
  banana.direction = Math.random() * Math.PI * 2;

  // this number will be used to modify the direction of the dude over time
  banana.turningSpeed = Math.random() - 0.8;

  // create a random speed for the banana between 0 - 2
  banana.speed = 2 + Math.random() * 2;

  // finally we push the banana into the bananasArray so it it can be easily accessed later
  bananasArray.push(banana);

  app.stage.addChild(banana);
}

// create a bounding box for the little bananas
const bananaBoundsPadding = 100;

const bananaBounds = new PIXI.Rectangle(
  -bananaBoundsPadding,
  -bananaBoundsPadding,
  app.screen.width + bananaBoundsPadding * 2,
  app.screen.height + bananaBoundsPadding * 2
);

app.ticker.add(() => {
  // iterate through the bananas and update the positions
  for (let i = 0; i < totalBananas; i++) {
    const banana = bananasArray[i];
    
    banana.direction += banana.turningSpeed * 0.01;
    banana.x = Math.sin(banana.direction) * banana.speed;
    banana.y = Math.cos(banana.direction) * banana.speed;
    banana.rotation = -banana.direction - Math.PI / 2;

    // wrap the bananas by testing their bounds...
    if (banana.x < bananaBounds.x) {
      banana.x += bananaBounds.width;
    } else if (banana.x > bananaBounds.x + bananaBounds.width) {
      banana.x -= bananaBounds.width;
    }

    if (banana.y < bananaBounds.y) {
      bananaBounds.y += bananaBounds.height;
    } else if (banana.y > bananaBounds.y + bananaBounds.height) {
      banana.y -= bananaBounds.height;
    }
  }
});
