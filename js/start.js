import { createObstacle, createBoss } from "./obstacle.js";
import { checkCollision } from "./collision.js";
import { Score } from "./score.js";
import { Player } from "./player.js";
import { createModal } from "./modals.js";


const player = new Player(document.getElementById("player"));
const score = new Score(document.getElementById("score"));
const gameField = document.getElementById("gameField");

const startGame = function (sounds) {
  let animationID;
  let speed = 7000;
  let startTime = 0;
  let lastObstacleTime = 0;
  let obstacles = [];
  let obstacleNum = 0;
  let minSpawnRate = 5;
  let maxSpawnRate = 5;
  let newObstacle = true;
  let boss = false;
  let wobbleSpeed = 1;

  // COUNTER

  // open TIMER modal

  const timerModal = createModal(
    `<div id="timer" class="modal">
    </div>`,
      true, false
  );

  let count = 3;
  const timerElement = document.getElementById("timer");
  const intervalID = setInterval(function () {
    timerElement.innerHTML = `<h2> ${count} </h2>`;
    if (count >= 0) {
      count--;
    } else {
      timerElement.innerHTML = `<h2> GO! </h2>`;

      sounds.play("start");
      clearInterval(intervalID);
      timerModal.remove();
    }
  }, 1000);

  // till here

  animationID = requestAnimationFrame(animation);

  document.addEventListener("keydown", (event) => {
    event.preventDefault();
    if (event.code === "Space") {
      player.jump(() => sounds.play("jump"));
    }
  });

  const animation = function (timestamp) {
    if (!startTime) startTime = timestamp;
    let elapsedTime = timestamp - startTime;

    if (newObstacle && !boss) {
      lastObstacleTime = elapsedTime;
      if (obstacleNum % 2 == 0) {
        speed = speed > 200 ? speed - 100 : speed;
        minSpawnRate = minSpawnRate == 0 ? 0 : minSpawnRate - 1;
      }

      let bossNumber = Math.floor(speed / 500);
      if (obstacleNum > 0 && obstacleNum % bossNumber == 0) {
        // call Boss

        obstacles[obstacleNum] = createBoss(gameField);
        obstacles[obstacleNum].move(speed * 3);
        obstacleNum++;
        boss = true;
        sounds.play("boss");
        minSpawnRate = 5;
        setInterval(() => {
          boss = false;
        }, 6000);
      } else {
        obstacles[obstacleNum] = createObstacle(gameField);
        obstacles[obstacleNum].move(speed);
        obstacleNum++;
      }
    }

    let obstacleSpawnRate =
      Math.random() * (maxSpawnRate - minSpawnRate) + minSpawnRate;
    newObstacle = elapsedTime - lastObstacleTime >= obstacleSpawnRate * 1000;

    if (checkCollision(player, obstacles)) {
      obstacles.forEach((x) => x.stop());
      sounds.play("lost");

      // minus one life or Game over /// sounds.play("gameover")

      player.stop();
      cancelAnimationFrame(animationID);
      return;
    } else {
      score.update();
    }
    wobbleSpeed += 0.08;
    obstacles.forEach((x) => x.changeWidth(wobbleSpeed));
    animationID = requestAnimationFrame(animation);
  };
};

export { startGame };
