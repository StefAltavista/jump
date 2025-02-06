import { Sounds } from "./sounds.js";
import { startGame } from "./start.js";

const muteButton = document.getElementById("soundMute");
const startButton = document.getElementById("start");
const welcomeModal = document.getElementById("welcome");
const userDataModal = document.getElementById("userData");
const submitDataButton = document.getElementById("submitData");
const sounds = new Sounds(muteButton);

muteButton.addEventListener("click", () => {
  sounds.toggleMute();
  mute = !mute;
});

startButton.addEventListener("click", () => {
  welcomeModal.classList.add("hide");
  userDataModal.classList.remove("hide");
});

submitDataButton.addEventListener("click", () => {
  userDataModal.classList.add("hide");
  startGame(sounds);
});
