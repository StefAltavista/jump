import { Sounds } from "./sounds.js";
import { startGame } from "./start.js";
import { current, signIn } from "./user.js";

const welcomeModal = document.getElementById("welcome");
const enterGame = document.getElementById("enterGame");
const signInModal = document.getElementById("signInModal");
const displayUserName = document.getElementById("displayUserName");
const muteButton = document.getElementById("soundMute");
const sounds = new Sounds(muteButton);

let user = current();

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

enterGame.addEventListener("click", async () => {
  welcomeModal.classList.add("hide");

  if (!user) {
    signInModal.classList.remove("hide");
    user = await signIn();
    signInModal.classList.add("hide");
    startGame(sounds);
  } else startGame(sounds);
});

muteButton.addEventListener("click", () => {
  sounds.toggleMute();
});
