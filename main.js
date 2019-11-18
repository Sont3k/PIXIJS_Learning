import * as PIXI from "pixi.js";

// The application will create a renderer using WebGL, if possible,
// with a fallback to a canvas render. It will also setup the ticker
// and the root stage PIXI.Container.
const app = new PIXI.Application();

// The application will create a canvas element for you that you
// can then insert into the DOM.
document.body.appendChild(app.view);

app.stop();

// load resources
app.loader.add("spritesheet", "./assets/monsters.json").load(onAssetsLoaded);

// holder to store aliens
const aliens = [];
const alienFrames = [
  "eggHead.png",
  "flowerTop.png",
  "helmlok.png",
  "skully.png"
];

let count = 0;

// create an empty container
const alienContainer = new PIXI.Container();
alienContainer.x = 400;
alienContainer.y = 300;

// make the stage interactive
app.stage.interactive = true;
app.stage.addChild(alienContainer);

function onAssetsLoaded() {
  // add a bunch of aliens with textures from image paths
  for (let i = 0; i < 100; i++) {
    const frameName = alienFrames[i % 4];

    // create an alien using the frame name...
    const alien = PIXI.Sprite.from(frameName);
    alien.tint = Math.random() * 0xffffff;

    /*
     * fun fact for the day :)
     * another way of doing the above would be
     * var texture = PIXI.Texture.from(frameName);
     * var alien = new PIXI.Sprite(texture);
     */

    alien.x = Math.random() * 800 - 400;
    alien.y = Math.random() * 600 - 300;
    alien.anchor.x = 0.5;
    alien.anchor.y = 0.5;
    aliens.push(alien);
    alienContainer.addChild(alien);
  }
  app.start();
}
