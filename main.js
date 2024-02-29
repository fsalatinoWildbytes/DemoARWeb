import { Game } from './Game.js';

async function main() {
  // Get a reference to the container element
  const container = document.querySelector("#container");

  // create a new game
  const game = new Game(container);

  //complete async tasks
  await game.init();

  // start the animation loop
  //world.start();

  //Start - Stop AR Camera
  
  // ----   BUTTON LISTENERS ---
  const startButton = document.querySelector("#startButton");
  startButton.addEventListener("click", () => {
    game.start();
  });

  const stopButton = document.querySelector("#stopButton");
  stopButton.addEventListener("click", () => {
     game.stop();
  });


  const leftButton = document.querySelector("#moveLeft");
  leftButton.addEventListener("click", () => {
    game.moveHookLeft();
  });

  const rightButton = document.querySelector("#moveRight");
  rightButton.addEventListener("click", () => {
    game.moveHookRight();
  });

  const upButton = document.querySelector("#moveUp");
  upButton.addEventListener("click", () => {
    game.moveHookUp();
  });


  const downButton = document.querySelector("#moveDown");
  downButton.addEventListener("click", () => {
    game.moveHookDown();
  });


  const grabButton = document.querySelector("#grab");
  grabButton.addEventListener("click", () => {
      game.grab();
  });


}

main().catch((err) => {
  console.error(err);
});
