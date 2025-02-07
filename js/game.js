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
  const { obstacles, player } = await startGame(sounds, gameStats);
  if (gameStats.lifes > 0) {
    const restartModal = createModal(
      `<div class="modals noBackground">
        <h2 class="gameOver__title">Life Left: ${gameStats.lifes}</h2>
        <h3 class="gameOver__title">Current Score: ${gameStats.score}</h3>
        <button id="restart">Retry</button>
      </div>`,
      true,
      true
    );
    const restartButton = document.getElementById("restart");
    restartButton.addEventListener("click", () => {
      player.element.remove();
      obstacles.forEach((obstacle) => {
        obstacle.element.remove();
        restartModal.remove();
      });

      return game();
    });
  } else {
    if (user.checkNewRecord(gameStats.score)) {
      console.log("new Record!");
      user.updateScoreRecord(gameStats.score);
      user.save(user);
    }
    const gameOverModal = createModal(
      `<div class="gameOver noBackground">
        <h2 class="gameOver__title">GAME OVER</h2>
        <p>Score: ${user.scoreRecord}</p>
        ${
          user.checkNewRecord(gameStats.score)
            ? "<h3>You Made a new Record!</h3>"
            : ``
        }
        <button id="newGame">New game</button><button id="changeUser">Change User</button><button id="viewList">Veiw Record List</button>
      </div>`,
      true,
      true
    );

    const newGameButton = document.getElementById("newGame");

    newGameButton.addEventListener("click", async () => {
      gameOverModal.remove();
      return game();
    });
    const changeUserButton = document.getElementById("changeUser");

    changeUserButton.addEventListener("click", () => {
      gameOverModal.remove();
      localStorage.removeItem("current");
      user = null;
      changeUser.remove();
      location.reload();
    });
    const viewListButton = document.getElementById("viewList");

    viewListButton.addEventListener("click", () => {
      gameOverModal.remove();
      const allUsers = getAllScore();
      const list = allUsers
        .map((x) => `<li><p>${x.name}: ${x.scoreRecord}</p></li>`)
        .join("");
      const recordModal = createModal(
        `<div class="recordsmodal modals"><h1>Jump Records</h1><div class="recordList"><ul>${list}</ul></div>
    <button id="exit">Exit</button></div>`,
        true,
        false
      );
      const exitButton = document.getElementById("exit");
      exitButton.addEventListener("click", () => {
        exitButton.remove();
        location.reload();
      });
    });
  }
};

function getAllScore() {
  let keys = Object.keys(localStorage);
  keys = keys.filter((x) => x.includes("id"));
  let allUsers = [];
  for (let i = 0; i < keys.length; i++) {
    allUsers[i] = JSON.parse(localStorage.getItem(keys[i]));
  }
  return allUsers;
}
