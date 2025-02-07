import { Sounds } from "./sounds.js";
import { startGame } from "./start.js";
import { current, signIn } from "./user.js";
import { createModal } from "./modals.js";
import  {GameStats} from "./gameStats.js"

// const welcomeModal = document.getElementById("welcome");
// const enterGame = document.getElementById("enterGame");
// const signInModal = document.getElementById("signInModal");
// const displayUserName = document.getElementById("displayUserName");
const muteButton = document.getElementById("soundMute");
const sounds = new Sounds(muteButton);

const gameStats = new GameStats(
  document.getElementById("score"),
  document.getElementById("life")
);

const game = async function () {
  const { score, lifes } = await startGame(sounds, gameStats);
  console.log(score, lifes);

  // if more lifes play again else save points, exit, ask again
};

game();
let user = current();


// const gameOverModal = createModal(
//   `<div class="gameOver noBackground">
//   <h2 class="gameOver__title">GAME OVER</h2>
//   <div class="gameOver__close">Press any key...</div>
// </div>`,
//   false, true
// );

if (user) {
  displayUserName.innerHTML = `<p>${user.name}</p>`;
} else {
  const signInButton = document.createElement("button");
  signInButton.setAttribute("id", "signin");
  displayUserName.appendChild(signInButton);
  signInButton.addEventListener("click", () => {
    console.log("open Sign In Modal");
    // const signInModal = createModal(
    //   `<div id="signInModal" class="modals modal_signIn">
    //       <h3>Enter your Name</h3>
    //       <input type="text" class="userDataInput" required/>
    //       <button id="submitData">Start</button>
    //     </div>`,
    //   true, false
    // );
  });
}

// at beginnig open Start Modal
const welcomeModal = createModal(
  `<div id="welcome" class="modals modal_start">
      <h2>Welcome to Jump!</h2>
      <button id="enterGame">Enter Game</button>
    </div>`,
  true, false
);

const enterGame = document.getElementById("enterGame");


enterGame.addEventListener("click", async () => {
  //  
  //   // close Start Modal
  welcomeModal.remove();

  if (!user) {
    const signInModal = createModal(
      `<div id="signInModal" class="modals modal_signIn">
          <h3>Enter your Name</h3>
          <input type="text" class="userDataInput" required/>
          <button id="submitData">Start</button>
        </div>`,
      true, false
    );
  
    const submitDataButton = document.getElementById("submitData");
    const userDataInput = document.querySelector(".userDataInput");
    
    user = await signIn(submitDataButton, userDataInput);
    signInModal.remove();


    //     startGame(sounds);
    //   } else startGame(sounds);
    // });

    muteButton.addEventListener("click", () => {
      sounds.toggleMute();
    });
  }

})