import { Player } from "./player.js";
import { createObstacle } from "./obstacle.js";
import { checkCollision } from "./collision.js";
import { Score } from "./score.js";

const player = new Player(document.getElementById("player"));
const score = new Score(document.getElementById("score"));
const gameField = document.getElementById("gameField");

// const lifes

document.addEventListener("keydown", (event) => {
  if (event.code === "Space") {
    player.jump();
  }
});

const startGame = function () {
  let animationID;
  let speed = 3000;
  let startTime = 0;
  let lastObstacleTime = 0;
  let obstacles = [];
  let obstacleNum = -1;
  const baseSpawnRate = 2;
  const minSpawnRate = 1;
  const maxSpawnRate = 5;

  const animation = function (timestamp) {
    if (!startTime) startTime = timestamp;
    let elapsedTime = timestamp - startTime;

    let obstacleSpawnRate =
      Math.random() * (maxSpawnRate - minSpawnRate) + minSpawnRate;

    if (elapsedTime - lastObstacleTime >= obstacleSpawnRate * 1000) {
      lastObstacleTime = elapsedTime;

      if (obstacleNum % 2 == 0) {
        speed -= 200;
      }

      obstacleNum++;
      obstacles[obstacleNum] = createObstacle(gameField);
      obstacles[obstacleNum].move(speed);
    }

    if (checkCollision(player, obstacles)) {
      obstacles.forEach((x) => x.stop());
      player.stop();
      cancelAnimationFrame(animationID);
      return;
    } else {
      score.update();
    }

    animationID = requestAnimationFrame(animation);
  };
  animationID = requestAnimationFrame(animation);
};

startGame();
