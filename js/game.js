import { Sounds } from "./sounds.js";
import { startGame } from "./start.js";
import { current, signIn } from "./user.js";
import { createModal } from "./modals.js";

const welcomeModal = document.getElementById("welcome");
const enterGame = document.getElementById("enterGame");
const signInModal = document.getElementById("signInModal");
const displayUserName = document.getElementById("displayUserName");
const muteButton = document.getElementById("soundMute");
const sounds = new Sounds(muteButton);

let user = current();

// const gameOverModal = createModal(
//   `<div class="gameOver noBackground">
//   <h2 class="gameOver__title">GAME OVER</h2>
//   <div class="gameOver__close">Press any key...</div>
// </div>`,
//   false
// );

if (user) {
  displayUserName.innerHTML = `<p>${user.name}</p>`;
} else {
  const signInButton = document.createElement("button");
  signInButton.setAttribute("id", "signin");
  displayUserName.appendChild(signInButton);
  signInButton.addEventListener("click", () => {
    console.log("open Sign In Modal");
  });
}

// at beginnig open Start Modal

// const startModal = createModal(
//   `<div id="welcome" class="modal">
//       <h2>Welcome to Jump!</h2>
//       <button id="enterGame">Enter Game</button>
//     </div>`,
//   true
// );

enterGame.addEventListener("click", async () => {
  // welcomeModal.classList.add("hide");

  // close Start Modal

  if (!user) {
    // open Sing In modal

    // signInModal.classList.remove("hide");

    // <div id="signInModal" class="modal hide">
    //     <h3>Enter your Name</h3>
    //     <input type="text" class="userDataInput" />
    //     <button id="submitData">Start</button>
    //   </div>

    user = await signIn();
    signInModal.classList.add("hide");

    startGame(sounds);
  } else startGame(sounds);
});

muteButton.addEventListener("click", () => {
  sounds.toggleMute();
});
