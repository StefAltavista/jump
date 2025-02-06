import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";
import { checkCollision } from "./collision.js";
import { Score } from "./score.js";

const player = new Player(document.getElementById("player"));
const obstacle = new Obstacle(document.getElementById("obstacle"));
const score = new Score(document.getElementById("score"));

// const lifes

console.log("start game");
document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    player.jump();
  }
});

//
setInterval(() => {
  if (checkCollision(player, obstacle)) {
    // check how many lives are left, and subtract one (make it gray) if none left game over
    alert("Game Over!");
    location.reload();
  } else {
    score.update();
  }
}, 100);
