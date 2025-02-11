import { Sounds } from "./sounds.js";
import { startGame } from "./start.js";
import { User, current, signIn } from "./user.js";
import { GameStats, getAllScore } from "./gameStats.js";
import {
  createModal,
  GameOverModal,
  RestartModal,
  SignInModal,
  RecordModal,
} from "./modals.js";

const MUTE_BUTTON = document.getElementById("soundMute");
const sounds = new Sounds(MUTE_BUTTON);
MUTE_BUTTON.addEventListener("click", () => {
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
  displayUserName.innerHTML = `<p>Player: ${user.name}</p>`;
  welcomeModal = createModal(
    `<div id="welcome" class="modals modal_start">
        <h2>Welcome to Jumping ${user.name}</h2>
        <button id="enterGame">New game</button><button id="changeUser">Change User</button>
      </div>`,
    true,
    false
  );

  const enterGame = document.getElementById("enterGame");
  const changeUser = document.getElementById("changeUser");

  changeUser.addEventListener("click", () => {
    welcomeModal.remove();
    localStorage.removeItem("current");
    user = null;
    changeUser.remove();
    location.reload();
  });

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

    const signInModal = SignInModal();
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
    const restartModal = RestartModal(gameStats);
    const restartButton = document.getElementById("restart");

    restartButton.addEventListener("click", () => {
      player.element.remove();
      restartModal.remove();
      obstacles.forEach((obstacle) => {
        obstacle.element.remove();
      });

      return game();
    });
  } else {
    const gameOverModal = GameOverModal(user, gameStats);
    const newGameButton = document.getElementById("newGame");
    const changeUserButton = document.getElementById("changeUser");
    const viewListButton = document.getElementById("viewList");

    if (user.checkNewRecord(gameStats.score)) {
      user.updateScoreRecord(gameStats.score);
      user.save(user);
    }

    newGameButton.addEventListener("click", async () => {
      gameStats.reset();
      gameOverModal.remove();
      obstacles.forEach((obstacle) => {
        obstacle.element.remove();
      });
      player.element.remove();
      return game();
    });

    changeUserButton.addEventListener("click", () => {
      localStorage.removeItem("current");
      user = null;
      changeUser.remove();

      location.reload();
    });

    viewListButton.addEventListener("click", () => {
      gameOverModal.remove();
      const allUsers = getAllScore();
      const list = allUsers
        .map((x) => `<li><p>${x.name}: ${x.scoreRecord}</p></li>`)
        .join("");
      const recordModal = RecordModal(list);
      const exitButton = document.getElementById("exit");
      exitButton.addEventListener("click", () => {
        recordModal.remove();
        location.reload();
      });
    });
  }
};
