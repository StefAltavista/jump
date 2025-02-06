import { Player } from "./player.js";
import { Obstacle } from "./obstacle.js";
import { checkCollision } from "./collision.js";
import { Score } from "./score.js";


const player = new Player(document.getElementById("player"));
const obstacle = new Obstacle(document.getElementById("obstacle"));
const score = new Score(document.getElementById("score"));

// const lifes
const game = function () {
  let startGame = confirm(
    "Hello There! Are you redy to play?"
  );
  if (startGame){
    let userName = userInput("Enter your Name", ""); 
    return count;
  }
};
const userInput = function (text, placeholder = "") {
  let input = prompt(text, placeholder);
  if (input == null) {
    console.error("write your name");
    return userInput();
    }
  else if(input == Number ) {
    console.error("write your name")
    return userInput();
  }
  else return input;
};
let count = 3; 
const timerElement = document.getElementById("timer");

const interval = setInterval(function() {
  timerElement.innerHTML = count;

  if (count <= 0) {
      clearInterval(interval); 
      timerElement.innerHTML = "Liftoff!"; 
  } else {
      count--; 
  }
  }, 1000); 


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

game();