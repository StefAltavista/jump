import { Sounds } from "./sounds.js";
import { startGame } from "./start.js";
import { User, current, signIn } from "./user.js";
import { createModal } from "./modals.js";
import { GameStats } from "./gameStats.js";

const muteButton = document.getElementById("soundMute");

const sounds = new Sounds(muteButton);
muteButton.addEventListener("click", () => {
  sounds.toggleMute();
});

const gameStats = new GameStats(
  document.getElementById("score"),
  document.getElementById("life")
);

let user = current();
let welcomeModal;

if (user) {
  user = User.load(localStorage.getItem("current"));
  displayUserName.innerHTML = `<p>${user.name}</p>`;
  welcomeModal = createModal(
    `<div id="welcome" class="modals modal_start">
        <h2>Welcome to Jump ${user.name}</h2>
        <button id="enterGame">New game</button><button id="changeUser">Change User</button>
      </div>`,
    true,
    false
  );

  const changeUser = document.getElementById("changeUser");

  changeUser.addEventListener("click", () => {
    welcomeModal.remove();
    localStorage.removeItem("current");
    user = null;
    changeUser.remove();
    location.reload();
  });

  const enterGame = document.getElementById("enterGame");

  enterGame.addEventListener("click", async () => {
    welcomeModal.remove();
    game();
  });
}

if (!user) {
  welcomeModal = createModal(
    `<div id="welcome" class="modals modal_start">
          <h2>Welcome to Jump stranger</h2>
          <button id="enterGame">Start game</button>
        </div>`,
    true,
    false
  );

  const enterGame = document.getElementById("enterGame");
  enterGame.addEventListener("click", async () => {
    welcomeModal.remove();

    const signInModal = createModal(
      `<div id="signInModal" class="modals modal_signIn">
          <h3>Enter your Name</h3>
          <input type="text" class="userDataInput" required/>
          <button id="submitData">Start</button>
        </div>`,
      true,
      false
    );
    const submitDataButton = document.getElementById("submitData");
    const userDataInput = document.querySelector(".userDataInput");
    user = await signIn(submitDataButton, userDataInput);
    signInModal.remove();
    game();
  });
}

const game = async function () {
  const obstacles = await startGame(sounds, gameStats);
  if (gameStats.lifes > 0) {
    const restartModal = createModal(
      `<div class="modals noBackground">
        <h2 class="gameOver__title">Life Left: ${gameStats.lifes}</h2>
        <h3 class="gameOver__title">Current Score: ${gameStats.score}</h3>
        <button id="restart">Press any key...</button>
      </div>`,
      true,
      true
    );
    const restartButton = document.getElementById("restart");
    restartButton.addEventListener("click", () => {
      obstacles.forEach((obstacle) => {
        obstacle.element.remove();
        restartModal.remove();
      });

      return game();
    });
  } else {
    const gameOverModal = createModal(
      `<div class="gameOver noBackground">
        <h2 class="gameOver__title">GAME OVER</h2>
        <div class="gameOver__close">Press any key...</div>
      </div>`,
      false,
      true
    );

    if (user.checkNewRecord(gameStats.score)) {
      console.log("new Record!");
      user.updateScoreRecord(gameStats.score);
      user.save(user);
    }

    const allUsers = getAllScore();
    const list = allUsers
      .map((x) => `<li><p>${x.name}: ${x.scoreRecord}</p></li>`)
      .join("");
    console.log(list);
    const recordModal = createModal(
      `<div class="recordsmodal modal"><h1>Jump Records</h1><ul>${list}</div>`,
      true,
      true
    );
  }
};

function getAllScore() {
  let keys = Object.keys(localStorage);
  keys = keys.filter((x) => x.includes("id"));
  let allUsers = [];

  for (let i = 0; i < keys.length; i++) {
    allUsers[i] = JSON.parse(localStorage.getItem(keys[i]));
  }
  // console.log(allUsers);

  return allUsers;
}
